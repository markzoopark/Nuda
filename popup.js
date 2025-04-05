// Функция для загрузки и отображения текущего шрифта
document.addEventListener('DOMContentLoaded', function () {
	const currentFontElement = document.getElementById('current-font');

	// Получаем текущий шрифт из хранилища
	chrome.storage.sync.get(
		{
			fontFamily: 'Fira Code', // Значение по умолчанию
		},
		function (items) {
			// Отображаем текущий шрифт
			currentFontElement.textContent = items.fontFamily;

			// Применяем текущий шрифт к самому элементу для демонстрации
			currentFontElement.style.fontFamily = `'${items.fontFamily}', monospace`;
		}
	);
});
