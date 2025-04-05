// Apply English translations for the privacy policy
document.addEventListener('DOMContentLoaded', function () {
	// Add privacy policy translations
	if (typeof translations !== 'undefined') {
		addPrivacyTranslations();
	} else {
		// Wait for translations to be defined
		const checkInterval = setInterval(function () {
			if (typeof translations !== 'undefined') {
				addPrivacyTranslations();
				clearInterval(checkInterval);
			}
		}, 100);
	}
});

function addPrivacyTranslations() {
	// English translations
	translations.en.dataCollection = 'Data Collection';
	translations.en.dataCollectionText =
		'The Nuda extension does not collect any user data. It operates completely locally on your device and does not transmit any information to external servers.';
	translations.en.permissions = 'Permissions';
	translations.en.permissionsText =
		'This extension requires permission to access all websites in order to apply font changes. The extension only modifies the appearance of websites you visit and does not read, collect, or transmit any of your browsing data.';
	translations.en.localStorage = 'Local Storage';
	translations.en.localStorageText =
		"The extension does not store any personal information. Any preferences you set will be stored locally in your browser using Chrome's storage API and will not be shared with anyone.";
	translations.en.updates = 'Updates';
	translations.en.updatesText =
		"This privacy policy may be updated in the future. Changes will be reflected in the extension's store listing and in this privacy policy document.";
	translations.en.contact = 'Contact';
	translations.en.contactText =
		'If you have any questions about this privacy policy, you can contact the developer through the Chrome Web Store support channel.';
	translations.en.lastUpdated = 'Last updated: January 2024';

	// Apply translations
	applyTranslations();
}
