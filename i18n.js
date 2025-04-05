// Translations for all supported languages
var translations = {
	en: {
		// Popup translations
		fontApplied: 'Font is applied globally',
		currentFont: 'Current font:',
		changeFont: 'Change Font',
		privacyPolicy: 'Privacy Policy',
		status: 'Status:',
		fontError: 'Error applying font',

		// Options page translations
		optionsTitle: 'Nuda Options',
		fontSettings: 'Font Settings',
		fontDescription:
			'Choose a preset font or enter the name of any font installed on your computer.',
		chooseFromList: 'Choose from list:',
		customFont: 'Custom font...',
		or: 'or',
		enterFontName: 'Enter font name:',
		exactFontName: 'Enter exact font name',
		fontNote: 'Note: the font must be installed on your computer',
		fontPreview: 'Font preview:',
		saveSettings: 'Save Settings',
		settingsSaved: 'Settings saved',
		about: 'About',
		extensionDescription:
			'Font Changer replaces all fonts on web pages with your selected font.',
		version: 'Version: 1.0.0',
		language: 'Language:',
		extensionName: 'Font Changer',
		errorApplying: 'Error applying font',
	},
	ru: {
		// Popup translations
		fontApplied: 'Шрифт применен глобально',
		currentFont: 'Текущий шрифт:',
		changeFont: 'Изменить шрифт',
		privacyPolicy: 'Политика конфиденциальности',
		status: 'Статус:',
		fontError: 'Ошибка при применении шрифта',

		// Options page translations
		optionsTitle: 'Настройки Nuda',
		fontSettings: 'Настройки шрифта',
		fontDescription:
			'Выберите предустановленный шрифт или введите название любого шрифта, установленного на вашем компьютере.',
		chooseFromList: 'Выбрать из списка:',
		customFont: 'Свой шрифт...',
		or: 'или',
		enterFontName: 'Введите название шрифта:',
		exactFontName: 'Введите точное название шрифта',
		fontNote:
			'Примечание: шрифт должен быть установлен на вашем компьютере',
		fontPreview: 'Предпросмотр шрифта:',
		saveSettings: 'Сохранить настройки',
		settingsSaved: 'Настройки сохранены',
		about: 'О расширении',
		extensionDescription:
			'Nuda заменяет все шрифты на веб-страницах на выбранный вами шрифт.',
		version: 'Версия: 1.0.0',
		language: 'Язык:',
		extensionName: 'Замена шрифта',
		errorApplying: 'Ошибка применения шрифта',
	},
	uk: {
		// Popup translations
		fontApplied: 'Шрифт застосовано глобально',
		currentFont: 'Поточний шрифт:',
		changeFont: 'Змінити шрифт',
		privacyPolicy: 'Політика конфіденційності',
		status: 'Статус:',
		fontError: 'Помилка при застосуванні шрифту',

		// Options page translations
		optionsTitle: 'Налаштування Nuda',
		fontSettings: 'Налаштування шрифту',
		fontDescription:
			"Виберіть попередньо встановлений шрифт або введіть назву будь-якого шрифту, встановленого на вашому комп'ютері.",
		chooseFromList: 'Вибрати зі списку:',
		customFont: 'Власний шрифт...',
		or: 'або',
		enterFontName: 'Введіть назву шрифту:',
		exactFontName: 'Введіть точну назву шрифту',
		fontNote:
			"Примітка: шрифт повинен бути встановлений на вашому комп'ютері",
		fontPreview: 'Попередній перегляд шрифту:',
		saveSettings: 'Зберегти налаштування',
		settingsSaved: 'Налаштування збережені',
		about: 'Про розширення',
		extensionDescription:
			'Nuda замінює всі шрифти на веб-сторінках на вибраний вами шрифт.',
		version: 'Версія: 1.0.0',
		language: 'Мова:',
		extensionName: 'Заміна шрифту',
		errorApplying: 'Помилка застосування шрифту',
	},
};

// Apply translations based on selected language
function applyTranslations(language) {
	if (!translations[language]) {
		language = 'en'; // Fallback to English
	}

	// Get all elements with data-i18n attribute
	const elements = document.querySelectorAll('[data-i18n]');
	elements.forEach((element) => {
		const key = element.getAttribute('data-i18n');
		if (translations[language][key]) {
			element.textContent = translations[language][key];
		}
	});

	// Handle placeholders
	const inputElements = document.querySelectorAll('[data-i18n-placeholder]');
	inputElements.forEach((input) => {
		const key = input.getAttribute('data-i18n-placeholder');
		if (translations[language][key]) {
			input.placeholder = translations[language][key];
		}
	});

	// Handle custom options
	const customOptions = document.querySelectorAll('option[data-i18n]');
	customOptions.forEach((option) => {
		const key = option.getAttribute('data-i18n');
		if (translations[language][key]) {
			option.textContent = translations[language][key];
		}
	});

	// Update HTML lang attribute
	document.documentElement.lang = language;
}

// Load language preference or use browser language
function loadLanguagePreference() {
	return new Promise((resolve) => {
		chrome.storage.sync.get(
			{
				language: getBrowserLanguage(), // Default to browser language
			},
			function (items) {
				resolve(items.language);
			}
		);
	});
}

// Save language preference
function saveLanguagePreference(language) {
	chrome.storage.sync.set({
		language: language,
	});
}

// Get browser language
function getBrowserLanguage() {
	const browserLang = navigator.language.split('-')[0];
	return translations[browserLang] ? browserLang : 'en'; // Fallback to English
}

// Initialize language on page load
async function initializeLanguage() {
	const languageSelect = document.getElementById('language-select');
	if (!languageSelect) return;

	const savedLanguage = await loadLanguagePreference();

	// Set the select value
	languageSelect.value = savedLanguage;

	// Apply translations
	applyTranslations(savedLanguage);

	// Add event listener for language change
	languageSelect.addEventListener('change', function () {
		const newLanguage = languageSelect.value;
		applyTranslations(newLanguage);
		saveLanguagePreference(newLanguage);
	});
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLanguage);
