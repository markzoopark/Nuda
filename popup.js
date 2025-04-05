// Функция для загрузки и отображения текущего шрифта
document.addEventListener('DOMContentLoaded', function () {
	const currentFontElement = document.getElementById('currentFontName');
	const enableToggle = document.getElementById('enableToggle');
	const optionsBtn = document.getElementById('optionsBtn');
	const successMessage = document.getElementById('success-message');
	const errorMessage = document.getElementById('error-message');

	// Загружаем состояние включения/выключения расширения
	chrome.storage.sync.get(
		{
			enabled: true, // Включено по умолчанию
			fontFamily: 'Arial', // Шрифт по умолчанию
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

	// Обработчик для переключателя
	enableToggle.addEventListener('change', function () {
		const enabled = enableToggle.checked;

		// Сначала сохраняем состояние в настройках
		chrome.storage.sync.set({ enabled: enabled }, function () {
			// Показываем сообщение об успешном действии
			successMessage.style.display = 'block';
			setTimeout(function () {
				successMessage.style.display = 'none';
			}, 2000);

			// Находим активную вкладку и перезагружаем ее для применения/удаления шрифта
			chrome.tabs.query(
				{ active: true, currentWindow: true },
				function (tabs) {
					if (tabs[0]) {
						// Перезагружаем активную вкладку для применения изменений
						chrome.tabs.reload(tabs[0].id);
					}
				}
			);

			// А также отправляем сообщение всем вкладкам
			chrome.tabs.query({}, function (tabs) {
				tabs.forEach(function (tab) {
					try {
						chrome.tabs.sendMessage(
							tab.id,
							{ action: enabled ? 'enable' : 'disable' },
							function (response) {
								// Игнорируем ошибки для вкладок, которые не могут получать сообщения
								if (chrome.runtime.lastError) {
									console.log(
										'Ошибка отправки сообщения на вкладку:',
										chrome.runtime.lastError
									);
								}
							}
						);
					} catch (e) {
						console.log('Ошибка при отправке сообщения:', e);
					}
				});
			});
		});
	});
});
