from django.urls import path
from chatgpt_api_ui import views

app_name = 'chatgpt_api_ui'

urlpatterns = [
    path('', views.chat_view, name="chat_ui"),
    path("get_messages/", views.get_messages),
    path("chat_completion/", views.chat_completion),
]
