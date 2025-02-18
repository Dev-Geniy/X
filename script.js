document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");

    function fadeInOnScroll() {
        let scrollTop = window.scrollY + window.innerHeight * 0.8;

        sections.forEach((section) => {
            if (section.offsetTop < scrollTop) {
                section.style.opacity = 1;
                section.style.transform = "translateY(0)";
            }
        });
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll();
});

// Ожидаем клик на кнопку меню для отображения/скрытия меню
const menuButton = document.querySelector('.menu-btn');
const leftSide = document.querySelector('.left-side');

// Добавляем событие клика
menuButton.addEventListener('click', () => {
    leftSide.classList.toggle('active');
});

// МОДАЛЬНЫЕ ОКНА
// Открытие модального окна
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        let modalId = item.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'block';
    });
});

// Закрытие по красному крестику
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.parentElement.style.display = 'none';
    });
});

// Функция отправки ссылки на статью в Telegram
function sendToTelegram(button) {
    // Найти родительский элемент кнопки (текущая статья)
    const currentArticle = button.closest('.blog-post');
    const title = currentArticle.querySelector('.blog-title').textContent; // Заголовок текущей статьи
    const url = window.location.href; // Текущая ссылка на статью

    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

    // Открываем ссылку в новом окне
    window.open(telegramUrl, '_blank');
}

// Функция для кнопки "Поделиться в соц. сетях"
function shareOnSocial() {
    const title = document.querySelector('.blog-content h2').textContent; // Заголовок статьи
    const url = window.location.href; // Текущая ссылка на статью

    // Проверка, поддерживает ли браузер Web Share API
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        })
        .then(() => console.log('Успешно поделились!'))
        .catch((error) => console.log('Ошибка при попытке поделиться:', error));
    } else {
        alert('Ваш браузер не поддерживает функцию "Поделиться"');
    }
}

// ПРОЕКТЫ
document.querySelectorAll('.toggle-info').forEach(button => {
    button.addEventListener('click', function () {
        let info = this.nextElementSibling;

        if (info.style.maxHeight && info.style.maxHeight !== "0px") {
            info.style.maxHeight = "0px";
            info.style.opacity = "0";
            this.textContent = "🢃 Подробнее";
        } else {
            info.style.maxHeight = info.scrollHeight + "px";
            info.style.opacity = "1";
            this.textContent = "🢁 Скрыть";
        }
    });
});
