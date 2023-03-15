from rest_framework import serializers
from chatgpt_api_ui.models import Chat, SystemRole, ChatMessage


# Serializers define the API representation.
class SystemRoleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SystemRole
        fields = "__all__"


class ChatMessageSerializer(serializers.HyperlinkedModelSerializer):
    chat = serializers.PrimaryKeyRelatedField(queryset=Chat.objects.all())

    class Meta:
        model = ChatMessage
        fields = "__all__"


class ChatSerializer(serializers.ModelSerializer):
    chat_messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = "__all__"
