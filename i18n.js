// English translations
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
		extensionName: 'Font Changer',
		errorApplying: 'Error applying font',
	},
};

// Apply text to elements with data-i18n attributes
function applyTranslations() {
	// Get all elements with data-i18n attribute
	const elements = document.querySelectorAll('[data-i18n]');
	elements.forEach((element) => {
		const key = element.getAttribute('data-i18n');
		if (translations.en[key]) {
			element.textContent = translations.en[key];
		}
	});

	// Handle placeholders
	const inputElements = document.querySelectorAll('[data-i18n-placeholder]');
	inputElements.forEach((input) => {
		const key = input.getAttribute('data-i18n-placeholder');
		if (translations.en[key]) {
			input.placeholder = translations.en[key];
		}
	});

	// Handle custom options
	const customOptions = document.querySelectorAll('option[data-i18n]');
	customOptions.forEach((option) => {
		const key = option.getAttribute('data-i18n');
		if (translations.en[key]) {
			option.textContent = translations.en[key];
		}
	});

	// Set HTML lang attribute
	document.documentElement.lang = 'en';
}

// Initialize translations on page load
document.addEventListener('DOMContentLoaded', applyTranslations);
