# from django.urls import path
# from . import views
# from django.conf import settings
# from django.conf.urls.static import static
#
# app_name = 'main'
#
# urlpatterns = [
#     path('', views.index),
#     path('cons', views.cons),
#     path('pack', views.pack),
# ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'main'

urlpatterns = [
    path('', views.index, name='index'),
    path('cons/', views.cons, name='cons'),
    path('pack/', views.pack, name='pack'),
    path('pack/', views.pack, name='taplink_pack'),  # Добавьте этот маршрут
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)