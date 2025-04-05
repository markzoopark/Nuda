// This script ensures the font is applied to all elements
// It runs at document_start to apply changes as early as possible

(function () {
	// Переменная для хранения выбранного шрифта
	let selectedFont = 'Arial'; // Значение по умолчанию
	let extensionEnabled = true; // Состояние расширения (включено/выключено)

	// Функция загрузки шрифта и состояния из настроек
	function loadSettings() {
		// Сначала удаляем все предыдущие стили, на случай перезагрузки страницы
		const previousStyle = document.getElementById('font-changer-style');
		if (previousStyle) {
			previousStyle.remove();
		}

		const previousReset = document.getElementById('font-changer-reset');
		if (previousReset) {
			previousReset.remove();
		}

		chrome.storage.sync.get(
			{
				fontFamily: 'Arial', // Значение по умолчанию
				enabled: true, // Включено по умолчанию
			},
			function (items) {
				selectedFont = items.fontFamily;
				extensionEnabled = items.enabled;

				// Применяем шрифт только если расширение включено
				if (extensionEnabled) {
					applyFontToExistingElements();
				} else {
					removeFontStyles();
				}
			}
		);
	}

	// Функция для применения шрифта ко всем элементам страницы
	function applyFontToExistingElements() {
		// Создаем или обновляем CSS правило
		let styleElement = document.getElementById('font-changer-style');

		if (!styleElement) {
			styleElement = document.createElement('style');
			styleElement.id = 'font-changer-style';
			document.head.appendChild(styleElement);
		}

		// Устанавливаем CSS правила с выбранным шрифтом
		styleElement.textContent = `
			* {
				font-family: '${selectedFont}', monospace !important;
			}
			
			body, p, div, span, h1, h2, h3, h4, h5, h6, a, button, input, select, textarea,
			li, td, th, pre, code {
				font-family: '${selectedFont}', monospace !important;
			}
			
			:root {
				--font-primary: '${selectedFont}', monospace !important;
				--font-secondary: '${selectedFont}', monospace !important;
				--font-mono: '${selectedFont}', monospace !important;
				--font-system: '${selectedFont}', monospace !important;
				--system-font: '${selectedFont}', monospace !important;
				--font-family: '${selectedFont}', monospace !important;
				--font: '${selectedFont}', monospace !important;
			}
		`;
	}

	// Функция для удаления стилей шрифта
	function removeFontStyles() {
		// Удаляем наш основной стилевой элемент
		const styleElement = document.getElementById('font-changer-style');
		if (styleElement) {
			styleElement.remove();
		}

		// Удаляем предыдущий ресет, если он был
		const resetStyle = document.getElementById('font-changer-reset');
		if (resetStyle) {
			resetStyle.remove();
		}

		// Вместо создания нового стиля, который перезаписывает все шрифты,
		// просто удаляем наши стили и позволяем оригинальным стилям сайта восстановиться
	}

	// Функция для наблюдения за изменениями DOM
	function applyFontToNewElements() {
		// Observe changes to DOM
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.addedNodes && mutation.addedNodes.length > 0) {
					// Force reapply styles for all new nodes
					mutation.addedNodes.forEach((node) => {
						if (node.nodeType === 1) {
							// Only process Element nodes
							// Стили уже должны применяться из-за * селектора
						}
					});
				}
			});
		});

		// Start observing with configuration
		observer.observe(document.documentElement, {
			childList: true,
			subtree: true,
		});
	}

	// Слушаем изменения настроек
	chrome.storage.onChanged.addListener(function (changes, namespace) {
		if (namespace === 'sync') {
			// Проверяем изменение шрифта
			if (changes.fontFamily) {
				selectedFont = changes.fontFamily.newValue;
				if (extensionEnabled) {
					applyFontToExistingElements();
				}
			}

			// Проверяем изменение состояния (включено/выключено)
			if (changes.enabled !== undefined) {
				extensionEnabled = changes.enabled.newValue;
				if (extensionEnabled) {
					applyFontToExistingElements();
				} else {
					removeFontStyles();
				}
			}
		}
	});

	// Слушаем сообщения от popup
	chrome.runtime.onMessage.addListener(function (
		message,
		sender,
		sendResponse
	) {
		if (message.action === 'enable') {
			extensionEnabled = true;
			applyFontToExistingElements();
			sendResponse({ success: true });
		} else if (message.action === 'disable') {
			extensionEnabled = false;
			removeFontStyles();
			sendResponse({ success: true });
		}

		// Возвращаем true для асинхронной обработки
		return true;
	});

	// Загружаем настройки перед началом
	loadSettings();

	// Run when DOM is loaded
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', applyFontToNewElements);
	} else {
		applyFontToNewElements();
	}
})();
