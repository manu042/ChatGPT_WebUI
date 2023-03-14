from rest_framework import serializers
from chatgpt_api_ui.models import Chat, SystemRole, ChatMessage


# Serializers define the API representation.
class SystemRoleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SystemRole
        fields = "__all__"


class ChatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Chat
        fields = "__all__"


class ChatMessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ChatMessage
        fields = "__all__"
