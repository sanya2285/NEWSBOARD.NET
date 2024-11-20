async function fetchRSS(url, elementId) {
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data && data.items) {
            const element = document.getElementById(elementId);
            let content = '<ul>';
            
            data.items.slice(0, 5).forEach(item => {
                content += `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`;
            });
            
            content += '</ul>';
            element.innerHTML = content;
        } else {
            console.error("No items found in RSS feed.");
        }
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
    }
}



// Функция для получения курсов валют из НБУ
async function fetchCurrency() {
    try {
        // Получаем данные о курсах валют с НБУ (URL API НБУ)
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
        const data = await response.json();
        
        // Проверка успешного получения данных
        if (data) {
            const element = document.getElementById('currency');
            
            // Находим курс доллара и евро по отношению к гривне
            const usd = data.find(item => item.cc === 'USD'); // Доллар
            const eur = data.find(item => item.cc === 'EUR'); // Евро

            // Формируем контент с курсами валют
            if (usd && eur) {
                element.innerHTML = `
                    <h2>Курсы валют</h2>
                    <ul>
                        <li>USD в UAH: ${usd.rate.toFixed(0)} UAH</li>
                        <li>EUR в UAH: ${eur.rate.toFixed(0)} UAH</li>
                    </ul>
                `;
            } else {
                console.error("Не удалось найти курсы для USD или EUR.");
                element.innerHTML = `<p>Ошибка при получении данных о курсах валют.</p>`;
            }
        } else {
            console.error("Не удалось получить данные о курсах валют.");
            document.getElementById('currency').innerHTML = `<p>Ошибка при получении данных о курсах валют.</p>`;
        }
    } catch (error) {
        console.error("Ошибка при получении данных с НБУ:", error);
        document.getElementById('currency').innerHTML = `<p>Ошибка при подключении к API НБУ.</p>`;
    }
}

// Вызываем функцию получения данных о курсах валют
fetchCurrency();



// Вызываем функцию получения данных о курсах валют
fetchCurrency();


// Подключаем RSS-фиды
fetchRSS('https://www.rbc.ua/static/rss/all.rus.rss.xml', 'news');  // Новости
fetchRSS('https://www.rbc.ua/static/rss/ukrnet.sport.rus.rss.xml', 'sports');                   // Спорт
fetchRSS('https://feeds.feedburner.com/itcua', 'tech');               // Технологии

// Погода и курсы валют
fetchCurrency();
// В данном случае, анимация запускается сразу при загрузке страницы,
// так что JavaScript не требуется для базового функционала.
// Но если нужно, можно добавить логику для динамической активации.
window.onload = () => {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach((tile, index) => {
    tile.style.animationDelay = `${index * 0.2}s`; // Динамическая задержка
  });
};
// Функция для получения и отображения данных из RSS
async function fetchRSS(url, elementId) {
    try {
        // Получаем RSS данные через API (например, через RSS2JSON)
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data && data.items) {
            const element = document.getElementById(elementId);
            let content = '<ul>';

            // Выводим первые 5 элементов из RSS-ленты
            data.items.slice(0, 5).forEach(item => {
                content += `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`;
            });

            content += '</ul>';
            element.innerHTML = content;
        } else {
            console.error("Нет данных в RSS-ленте.");
        }
    } catch (error) {
        console.error("Ошибка при получении данных RSS:", error);
    }
}

// Подключаем RSS-канал с вашими рецептами
fetchRSS('https://rss.app/feeds/QrAsgIzTTXha5qy1.xml', 'recipes');
