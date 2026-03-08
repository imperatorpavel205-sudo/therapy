import os
from django.core.wsgi import get_wsgi_application

if os.environ.get('RENDER', False):
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'therapy.settings_production')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'therapy.settings')

application = get_wsgi_application()