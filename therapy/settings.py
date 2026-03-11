"""
Production settings for therapy project - Railway version
"""

import os
import sys
from pathlib import Path
import dj_database_url
from dotenv import load_dotenv
from django.core.management.utils import get_random_secret_key

# Load environment variables from .env file (for local development)
load_dotenv()

# Build paths
BASE_DIR = Path(__file__).resolve().parent.parent

# Security
PRODUCTION = os.getenv('PRODUCTION', 'False') == 'True'

# SECURITY WARNING: keep the secret key used in production secret!
# ❗ В продакшене SECRET_KEY должен быть обязательно задан через env
SECRET_KEY = os.getenv('SECRET_KEY')
if not SECRET_KEY and not PRODUCTION:
    SECRET_KEY = get_random_secret_key()  # Только для локальной разработки

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'False') == 'True'

# 🌐 ALLOWED_HOSTS - добавьте ваш кастомный домен!
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.up.railway.app',  # Все поддомены railway
    'web-production-1fa23.up.railway.app',  # ваш конкретный домен Railway
    'therapy-souls.ru',        # ✅ Ваш кастомный домен
    'www.therapy-souls.ru',    # ✅ WWW-версия
]

# 🛡️ CSRF_TRUSTED_ORIGINS - важно для HTTPS и кастомных доменов
CSRF_TRUSTED_ORIGINS = [
    'http://localhost',
    'http://127.0.0.1',
    'https://*.up.railway.app',
    'https://therapy-souls.ru',      # ✅ Ваш домен
    'https://www.therapy-souls.ru',  # ✅ WWW-версия
]
# Дополнительно: если используете переменную окружения для гибкости
env_origins = os.getenv('CSRF_TRUSTED_ORIGINS', '')
if env_origins:
    CSRF_TRUSTED_ORIGINS += [origin.strip() for origin in env_origins.split(',') if origin.strip()]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main',  # Ваше приложение
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # ✅ Для раздачи статики на Railway
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'therapy.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'therapy.wsgi.application'

# 🗄️ Database
# Для Railway лучше использовать PostgreSQL (бесплатно через Railway Marketplace)
# Если пока используете SQLite:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
# 🔥 Если подключите PostgreSQL в Railway, раскомментируйте это:
# if os.getenv('DATABASE_URL'):
#     DATABASES['default'] = dj_database_url.config(
#         default=os.getenv('DATABASE_URL'),
#         conn_max_age=600,
#         conn_health_checks=True,
#     )

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_TZ = True

# 📁 Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# 🖼️ Media files (user uploads)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# 🔐 Security settings for production
if PRODUCTION and not DEBUG:
    SECURE_SSL_REDIRECT = True  # Перенаправление на HTTPS
    SESSION_COOKIE_SECURE = True  # Cookies только по HTTPS
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'
    SECURE_HSTS_SECONDS = 31536000  # 1 год
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    # ❗ Важно: если используете обратный прокси (Railway), добавьте:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# 📝 Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {'class': 'logging.StreamHandler'},
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO' if not DEBUG else 'DEBUG',
        },
    },
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'