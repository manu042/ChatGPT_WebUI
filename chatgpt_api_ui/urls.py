from django.urls import path, re_path
from chatgpt_api_ui import views

app_name = 'chatgpt_api_ui'

urlpatterns = [
    path('', views.chat_view, name="chat_ui"),
    re_path(r'^(?P<pk>\d+)/$', views.chat_view, name="chat_pk"),
    path("chat_completion/", views.chat_completion),
    path("new_chat/", views.create_chat, name="new_chat"),
]
