from django.contrib import admin
from chatgpt_api_ui.models import Chat, ChatMessage, SystemRole


admin.site.register(Chat)
admin.site.register(ChatMessage)
admin.site.register(SystemRole)
