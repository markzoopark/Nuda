// This script ensures the font is applied to all elements
// It runs at document_start to apply changes as early as possible

(function () {
	// Переменная для хранения выбранного шрифта
	let selectedFont = 'Fira Code'; // Значение по умолчанию

	// Функция загрузки шрифта из настроек
	function loadFontSettings() {
		chrome.storage.sync.get(
			{
				fontFamily: 'Fira Code', // Значение по умолчанию
			},
			function (items) {
				selectedFont = items.fontFamily;
				applyFontToExistingElements();
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
		if (namespace === 'sync' && changes.fontFamily) {
			selectedFont = changes.fontFamily.newValue;
			applyFontToExistingElements();
		}
	});

	// Загружаем шрифт перед началом
	loadFontSettings();

	// Run when DOM is loaded
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', applyFontToNewElements);
	} else {
		applyFontToNewElements();
	}
})();
