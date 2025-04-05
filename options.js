// Функции и обработчики событий для страницы настроек

// Получаем элементы
const fontSelect = document.getElementById('font-select');
const customFontContainer = document.getElementById('custom-font-container');
const customFontInput = document.getElementById('custom-font');
const previewText = document.getElementById('preview-text');
const saveButton = document.getElementById('save');
const status = document.getElementById('status');
const languageSelect = document.getElementById('language-select');

// Загружаем сохраненные настройки при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
	loadOptions();
	initLanguage();
	translateUI();
});

// Функция инициализации языка
function initLanguage() {
	chrome.storage.sync.get({ language: 'en' }, function (items) {
		languageSelect.value = items.language;
	});

	// Обработчик изменения языка
	languageSelect.addEventListener('change', function () {
		chrome.storage.sync.set(
			{ language: languageSelect.value },
			function () {
				translateUI();
			}
		);
	});
}

// Функция перевода интерфейса
function translateUI() {
	chrome.storage.sync.get({ language: 'en' }, function (items) {
		const lang = items.language;
		const elements = document.querySelectorAll('[data-i18n]');

		elements.forEach(function (element) {
			const key = element.getAttribute('data-i18n');
			if (translations[lang] && translations[lang][key]) {
				element.textContent = translations[lang][key];
			}
		});

		// Переводим плейсхолдеры
		const inputElements = document.querySelectorAll(
			'input[data-i18n-placeholder]'
		);
		inputElements.forEach(function (element) {
			const key = element.getAttribute('data-i18n-placeholder');
			if (translations[lang] && translations[lang][key]) {
				element.placeholder = translations[lang][key];
			}
		});
	});
}

// Функция загрузки сохраненных настроек
function loadOptions() {
	chrome.storage.sync.get(
		{
			fontFamily: 'Arial', // Значение по умолчанию
		},
		function (items) {
			// Проверяем, если шрифт из предустановленных
			const selectOptions = Array.from(fontSelect.options).map(
				(option) => option.value
			);
			const isPresetFont =
				selectOptions.includes(items.fontFamily) &&
				items.fontFamily !== 'custom';

			if (isPresetFont) {
				fontSelect.value = items.fontFamily;
			} else {
				fontSelect.value = 'custom';
				customFontInput.value = items.fontFamily;
				customFontContainer.style.display = 'block';
			}

			// Обновляем предпросмотр
			updatePreview(items.fontFamily);
		}
	);
}

// Функция сохранения настроек
function saveOptions() {
	let selectedFont = fontSelect.value;

	// Если выбран пользовательский шрифт, берем значение из поля ввода
	if (selectedFont === 'custom') {
		selectedFont = customFontInput.value.trim();
		// Если пользовательский шрифт не указан, используем значение по умолчанию
		if (!selectedFont) {
			selectedFont = 'Arial';
		}
	}

	// Сохраняем в хранилище Chrome
	chrome.storage.sync.set(
		{
			fontFamily: selectedFont,
		},
		function () {
			// Get current language
			chrome.storage.sync.get(
				{
					language: 'en', // Default language
				},
				function (items) {
					// Get and display the translated message
					let message = 'Settings saved';
					if (
						translations[items.language] &&
						translations[items.language].settingsSaved
					) {
						message = translations[items.language].settingsSaved;
					}

					// Обновляем интерфейс
					status.textContent = message;
					status.classList.add('success');

					// Скрываем сообщение через 3 секунды
					setTimeout(function () {
						status.classList.remove('success');
					}, 3000);
				}
			);
		}
	);
}

// Обработчик изменения выбора шрифта
fontSelect.addEventListener('change', function () {
	if (fontSelect.value === 'custom') {
		customFontContainer.style.display = 'block';
		updatePreview(customFontInput.value || 'system-ui');
	} else {
		customFontContainer.style.display = 'none';
		updatePreview(fontSelect.value);
	}
});

// Обработчик изменения пользовательского шрифта
customFontInput.addEventListener('input', function () {
	updatePreview(customFontInput.value || 'system-ui');
});

// Функция предпросмотра шрифта
function updatePreview(fontFamily) {
	previewText.style.fontFamily = `${fontFamily}, system-ui, sans-serif`;
}

// Обработчик нажатия кнопки сохранения
saveButton.addEventListener('click', saveOptions);
