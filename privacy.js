// Wait for i18n.js to load and define translations
document.addEventListener('DOMContentLoaded', function () {
	// Add privacy policy translations once the DOM is loaded
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
		'The Font Changer extension does not collect any user data. It operates completely locally on your device and does not transmit any information to external servers.';
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

	// Russian translations
	translations.ru.dataCollection = 'Сбор данных';
	translations.ru.dataCollectionText =
		'Расширение Font Changer не собирает никаких пользовательских данных. Оно работает полностью локально на вашем устройстве и не передает информацию на внешние серверы.';
	translations.ru.permissions = 'Разрешения';
	translations.ru.permissionsText =
		'Это расширение требует разрешения на доступ ко всем веб-сайтам для применения изменений шрифта. Расширение только изменяет внешний вид посещаемых вами веб-сайтов и не читает, не собирает и не передает никаких данных о вашем просмотре.';
	translations.ru.localStorage = 'Локальное хранилище';
	translations.ru.localStorageText =
		'Расширение не хранит никакой личной информации. Любые настройки, которые вы устанавливаете, будут храниться локально в вашем браузере с помощью API хранилища Chrome и не будут переданы никому.';
	translations.ru.updates = 'Обновления';
	translations.ru.updatesText =
		'Эта политика конфиденциальности может быть обновлена в будущем. Изменения будут отражены в списке расширений магазина Chrome и в этом документе о политике конфиденциальности.';
	translations.ru.contact = 'Контакты';
	translations.ru.contactText =
		'Если у вас есть вопросы об этой политике конфиденциальности, вы можете связаться с разработчиком через канал поддержки Chrome Web Store.';
	translations.ru.lastUpdated = 'Последнее обновление: январь 2024';

	// Ukrainian translations
	translations.uk.dataCollection = 'Збір даних';
	translations.uk.dataCollectionText =
		'Розширення Font Changer не збирає жодних користувацьких даних. Воно працює повністю локально на вашому пристрої і не передає інформацію на зовнішні сервери.';
	translations.uk.permissions = 'Дозволи';
	translations.uk.permissionsText =
		'Це розширення потребує дозволу на доступ до всіх веб-сайтів для застосування змін шрифту. Розширення лише змінює зовнішній вигляд веб-сайтів, які ви відвідуєте, і не читає, не збирає та не передає жодних даних про ваш перегляд.';
	translations.uk.localStorage = 'Локальне сховище';
	translations.uk.localStorageText =
		'Розширення не зберігає жодної особистої інформації. Будь-які налаштування, які ви встановлюєте, зберігатимуться локально у вашому браузері за допомогою API сховища Chrome і не будуть передані нікому.';
	translations.uk.updates = 'Оновлення';
	translations.uk.updatesText =
		'Ця політика конфіденційності може бути оновлена в майбутньому. Зміни будуть відображені в списку розширень магазину Chrome та в цьому документі про політику конфіденційності.';
	translations.uk.contact = 'Контакти';
	translations.uk.contactText =
		"Якщо у вас є питання щодо цієї політики конфіденційності, ви можете зв'язатися з розробником через канал підтримки Chrome Web Store.";
	translations.uk.lastUpdated = 'Останнє оновлення: січень 2024';

	// Initialize the language selector after adding translations
	initializeLanguage();
}
