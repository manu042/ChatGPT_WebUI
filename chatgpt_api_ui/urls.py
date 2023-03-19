from django.urls import path, re_path
from chatgpt_api_ui import views

app_name = 'chatgpt_api_ui'

urlpatterns = [
    path('', views.chat_view, name="chat_ui"),
    re_path(r'^(?P<pk>\d+)/$', views.chat_view, name="chat_pk"),
    path("new_chat/", views.create_chat, name="new_chat"),
    path("new_system_role", views.create_system_role, name="new_system_role"),
    path("api/chat_completion/", views.chat_completion_view),
]
