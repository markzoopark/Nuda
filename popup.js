// Функция для загрузки и отображения текущего шрифта
document.addEventListener('DOMContentLoaded', function () {
	const currentFontElement = document.getElementById('currentFontName');
	const enableToggle = document.getElementById('enableToggle');
	const optionsBtn = document.getElementById('optionsBtn');
	const refreshBtn = document.getElementById('refreshBtn');
	const successMessage = document.getElementById('success-message');
	const errorMessage = document.getElementById('error-message');

	// Загружаем состояние включения/выключения расширения
	chrome.storage.sync.get(
		{
			enabled: true, // Включено по умолчанию
			fontFamily: 'Fira Code', // Шрифт по умолчанию
		},
		function (items) {
			// Отображаем текущий шрифт
			currentFontElement.textContent = items.fontFamily;

			// Устанавливаем состояние переключателя
			enableToggle.checked = items.enabled;
		}
	);

	// Обработчик для кнопки настроек
	optionsBtn.addEventListener('click', function () {
		chrome.runtime.openOptionsPage();
	});

	// Обработчик для кнопки обновления страницы
	refreshBtn.addEventListener('click', function () {
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
				if (tabs[0]) {
					chrome.tabs.reload(tabs[0].id);

					// Показываем сообщение об успешном применении
					successMessage.style.display = 'block';
					setTimeout(function () {
						successMessage.style.display = 'none';
					}, 3000);
				} else {
					// Показываем сообщение об ошибке
					errorMessage.style.display = 'block';
					setTimeout(function () {
						errorMessage.style.display = 'none';
					}, 3000);
				}
			}
		);
	});

	// Обработчик для переключателя
	enableToggle.addEventListener('change', function () {
		const enabled = enableToggle.checked;

		// Сохраняем состояние
		chrome.storage.sync.set({ enabled: enabled }, function () {
			// Применяем или отключаем шрифт на всех вкладках
			chrome.tabs.query({}, function (tabs) {
				tabs.forEach(function (tab) {
					chrome.tabs.sendMessage(
						tab.id,
						{ action: enabled ? 'enable' : 'disable' },
						function (response) {
							// Обработка ошибки если вкладка не загружена
							if (chrome.runtime.lastError) {
								console.log(
									'Ошибка отправки сообщения на вкладку:',
									chrome.runtime.lastError
								);
							}
						}
					);
				});

				// Показываем сообщение
				successMessage.style.display = 'block';
				setTimeout(function () {
					successMessage.style.display = 'none';
				}, 3000);
			});
		});
	});

	// Обработчик смены языка
	document
		.getElementById('language-select')
		.addEventListener('change', function (e) {
			chrome.storage.sync.set({ language: e.target.value });
		});

	// Загружаем текущий язык
	chrome.storage.sync.get({ language: 'en' }, function (data) {
		document.getElementById('language-select').value = data.language;
	});
});
