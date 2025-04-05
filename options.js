// Функции и обработчики событий для страницы настроек

// Получаем элементы
const fontSelect = document.getElementById('font-select');
const customFontContainer = document.getElementById('custom-font-container');
const customFontInput = document.getElementById('custom-font');
const previewText = document.getElementById('preview-text');
const saveButton = document.getElementById('save');
const status = document.getElementById('status');

// Загружаем сохраненные настройки при загрузке страницы
document.addEventListener('DOMContentLoaded', loadOptions);

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
