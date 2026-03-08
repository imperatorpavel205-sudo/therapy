from django.shortcuts import render

def index(request):
    """Главная страница"""
    return render(request, 'main/index.html')

def cons(request):
    """Страница консультаций"""
    return render(request, 'main/cons.html')

def pack(request):
    """Страница с пакетами"""
    return render(request, 'main/pack.html')