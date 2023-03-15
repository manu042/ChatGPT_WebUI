import uuid
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class SystemRole(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class Chat(models.Model):
    # https://platform.openai.com/docs/api-reference/chat/create
    TEMPERATURE_HELP = "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic."
    PRESENCE_PENALTY_HELP = "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics."
    FREQUENCY_PENALTY_HELP = "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim."

    system_role = models.ForeignKey('SystemRole', on_delete=models.CASCADE)

    timestamp = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255)
    chat_id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(primary_key=False, default=uuid.uuid4, editable=False)

    temperature = models.DecimalField(default=1, max_digits=2, decimal_places=1, validators=[MinValueValidator(0), MaxValueValidator(2)], help_text=TEMPERATURE_HELP)
    max_tokens = models.PositiveIntegerField(default=4096)
    presence_penalty = models.DecimalField(default=0, max_digits=2, decimal_places=1, validators=[MinValueValidator(-2), MaxValueValidator(2)], help_text=PRESENCE_PENALTY_HELP)
    frequency_penalty = models.DecimalField(default=0, max_digits=2, decimal_places=1, validators=[MinValueValidator(-2), MaxValueValidator(2)], help_text=FREQUENCY_PENALTY_HELP)

    def __str__(self):
        return f"{self.name}"


class ChatMessage(models.Model):
    USER = "user"
    ASSISTANT = "assistant"
    ROLE_CHOICES = [
        (USER, 'User'),
        (ASSISTANT, 'Assistant'),
    ]

    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="chat_messages")
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    role = models.CharField(max_length=9, choices=ROLE_CHOICES, default=USER)
    completion_tokens = models.PositiveIntegerField(default=0)
    prompt_tokens = models.PositiveIntegerField(default=0)
    total_tokens = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.role}: {self.content[:10]}"
