// Создаем CSS стили для модального окна
const style = document.createElement('style');
style.textContent = `
    .certificate-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .certificate-modal.active {
        opacity: 1;
        visibility: visible;
    }

    .certificate-modal__content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background-color: white;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }

    .certificate-modal.active .certificate-modal__content {
        transform: scale(1);
    }

    .certificate-modal__img {
        display: block;
        max-width: 100%;
        max-height: 80vh;
        height: auto;
        border-radius: 5px;
    }

    .certificate-modal__close {
        position: absolute;
        top: -15px;
        right: -15px;
        width: 40px;
        height: 40px;
        background-color: #000080;
        color: white;
        border-radius: 50%;
        border: none;
        font-size: 24px;
        line-height: 1;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;
        z-index: 1001;
    }

    .certificate-modal__close:hover {
        background-color: #c0392b;
        transform: rotate(90deg);
    }

    .certificate-photo {
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .certificate-photo:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

// Создаем модальное окно
const modalHTML = `
    <div class="certificate-modal">
        <div class="certificate-modal__content">
            <button class="certificate-modal__close">&times;</button>
            <img src="" alt="Увеличенный сертификат" class="certificate-modal__img">
        </div>
    </div>
`;

// Добавляем модальное окно в body
document.body.insertAdjacentHTML('beforeend', modalHTML);

// Получаем элементы
const certificateImg = document.querySelector('.certificate-photo');
const modal = document.querySelector('.certificate-modal');
const modalImg = modal.querySelector('.certificate-modal__img');
const closeBtn = modal.querySelector('.certificate-modal__close');

// Функция для открытия модального окна
function openModal() {
    modalImg.src = certificateImg.src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
}

// Функция для закрытия модального окна
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Восстанавливаем прокрутку страницы
}

// Обработчик клика на изображение сертификата
if (certificateImg) {
    certificateImg.addEventListener('click', openModal);

    // Добавляем стиль для курсора, чтобы показать что это кликабельно
    certificateImg.style.cursor = 'zoom-in';
}

// Обработчик клика на кнопку закрытия
closeBtn.addEventListener('click', closeModal);

// Закрытие модального окна при клике на фон
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Закрытие модального окна при нажатии Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Добавляем обработчик для кнопки в футере (если нужен)
const consultationButton = document.querySelector('.consultation-button');
if (consultationButton) {
    consultationButton.addEventListener('click', function() {
        // Прокрутка к форме записи или открытие формы
        // Здесь можно добавить свою логику для записи
        alert('Функция записи на консультацию');
    });
}






// Функция для создания мобильного меню
function createMobileMenu() {
    const mobileMenuHTML = `
        <div class="mobile-overlay" id="mobileOverlay"></div>
        <div class="mobile-menu" id="mobileMenu">
            <ul>
                <li><a href="#advantages">Преимущества</a></li>
                <li><a href="#method">О методе</a></li>
                <li><a href="#services">Услуги</a></li>
                <li><a href="#footer">Контакты</a></li>
                <li>
                    <div class="social-icons">
                        <a href="https://t.me/Alexander_Zurba" target="_blank" aria-label="Telegram">
                            <img src="/static/main/img/TG.png" alt="Telegram" class="logo-tg">
                        </a>
                        <a href="https://wa.me/79779637789" target="_blank" aria-label="WhatsApp">
                            <img src="/static/main/img/WA.png" alt="WhatsApp" class="logo-wa">
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
}

// Функции для работы мобильного меню
function openMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileOverlay');
    const burgerMenu = document.getElementById('burgerMenu');

    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    burgerMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileOverlay');
    const burgerMenu = document.getElementById('burgerMenu');

    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    burgerMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Функция для плавной прокрутки
function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Функция для проверки ширины экрана и управления меню
function checkMenuVisibility() {
    const burgerMenu = document.getElementById('burgerMenu');
    const desktopNav = document.querySelector('.desktop-nav');
    const windowWidth = window.innerWidth;

    if (windowWidth < 1024) {
        // На мобильных и планшетах
        if (burgerMenu) burgerMenu.style.display = 'flex';
        if (desktopNav) desktopNav.style.display = 'none';
    } else {
        // На десктопе
        if (burgerMenu) burgerMenu.style.display = 'none';
        if (desktopNav) desktopNav.style.display = 'flex';
        closeMobileMenu(); // Закрываем мобильное меню если открыто
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Создаем мобильное меню
    createMobileMenu();

    // Проверяем видимость меню при загрузке
    checkMenuVisibility();

    // Элементы меню
    const burgerMenu = document.getElementById('burgerMenu');
    const overlay = document.getElementById('mobileOverlay');
    const mobileMenu = document.getElementById('mobileMenu');
    const desktopNav = document.querySelector('.desktop-nav');

    // Открытие/закрытие мобильного меню по клику на бургер
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            if (this.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Закрытие меню по клику на оверлей
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    // Закрытие меню по клику на ссылки в мобильном меню
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                closeMobileMenu();
                setTimeout(() => {
                    smoothScroll(targetId);
                }, 300);
            }
        });
    }

    // Плавная прокрутка для десктопного меню
    if (desktopNav) {
        const desktopLinks = desktopNav.querySelectorAll('a[href^="#"]');
        desktopLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                smoothScroll(targetId);
            });
        });
    }

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const burgerMenu = document.getElementById('burgerMenu');

        if (mobileMenu && mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            burgerMenu && !burgerMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Проверка при изменении размера окна
    window.addEventListener('resize', checkMenuVisibility);
});
