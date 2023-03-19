from django import forms
from django.core.validators import MinValueValidator, MaxValueValidator
from chatgpt_api_ui.models import SystemRole, Chat


class SystemRoleForm(forms.ModelForm):
    class Meta:
        model = SystemRole
        fields = ['name', 'description']


class ChatForm(forms.ModelForm):
    class Meta:
        model = Chat
        fields = ['system_role', 'name', 'temperature', 'max_tokens', 'presence_penalty', 'frequency_penalty']

    temperature = forms.DecimalField(help_text=Chat.TEMPERATURE_HELP, validators=[MinValueValidator(0), MaxValueValidator(2)])
    presence_penalty = forms.DecimalField(help_text=Chat.PRESENCE_PENALTY_HELP, validators=[MinValueValidator(-2), MaxValueValidator(2)])
    frequency_penalty = forms.DecimalField(help_text=Chat.FREQUENCY_PENALTY_HELP, validators=[MinValueValidator(-2), MaxValueValidator(2)])
