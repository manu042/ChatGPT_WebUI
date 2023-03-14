from django.urls import path, re_path
from chatgpt_api_ui import views

app_name = 'chatgpt_api_ui'

urlpatterns = [
    path('', views.chat_view, name="chat_ui"),
    re_path(r'^(?P<uuid>[a-f0-9-]+)/$', views.chat_view, name="chat_ui_uuid"),
    path("get_messages/", views.get_messages),
    path("chat_completion/", views.chat_completion),
    path("new_chat/", views.create_chat, name="new_chat"),
]
