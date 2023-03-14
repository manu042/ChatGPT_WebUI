from rest_framework import viewsets

from django.contrib.auth.models import User
from chatgpt_api_ui.models import Chat, SystemRole, ChatMessage
from chatgpt_api_ui.serializers import ChatSerializer, SystemRoleSerializer, ChatMessageSerializer


# ViewSets define the view behavior.
class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class SystemRoleViewSet(viewsets.ModelViewSet):
    queryset = SystemRole.objects.all()
    serializer_class = SystemRoleSerializer


class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
