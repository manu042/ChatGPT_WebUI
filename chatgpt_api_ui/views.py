import json
import logging
from datetime import datetime

from django.urls import reverse
from django.http import JsonResponse
from django.shortcuts import render, redirect
from chatgpt_api_ui.models import Chat, ChatMessage
from django.contrib.auth.decorators import login_required
from chatgpt_api_ui.forms import ChatForm
from chatgpt_api_ui.utilities import chat_completion

logger = logging.getLogger('chatgpt_webui')


@login_required(login_url='/admin/login/')
def chat_view(request, pk=None):
    if pk is None:
        # If no primary key is provided, get the primary key of the newest Chat object
        chat = Chat.objects.order_by('-pk').first()
        if chat is not None:
            return redirect(reverse('chatgpt_api_ui:chat_pk', args=[chat.pk]))

    # Render the chat_view.html template as before
    messages = ChatMessage.objects.all()
    chats = Chat.objects.all()
    context = {
        "chats": chats,
        "messages": messages
    }
    return render(request, 'chatgpt_api_ui/chat_view.html', context)


@login_required
def chat_completion_view(request):
    if request.method == "POST":
        # Parse the request body as JSON and retrieve the chatPK and message fields
        data = json.loads(request.body)
        chat_pk = data.get("chatPK")
        message = data.get("message")

        try:
            # Retrieve the Chat object associated with the chat PK
            # If the Chat object does not exist, create a new one with the specified PK
            chat_obj = Chat.objects.get_or_create(pk=chat_pk)[0]

            # Create messages list
            messages = list()
            messages.append({"role": "system", "content": chat_obj.system_role.description.replace("{{date}}", datetime.now().strftime("%d.%m.%Y"))})
            messages_obj = chat_obj.chat_messages.all()

            for msg in messages_obj:
                messages.append({"role": msg.role, "content": msg.content})

            logger.info('New message: {}'.format(message))
            messages.append({"role": "user", "content": message})

            # Get chat completion response
            response = chat_completion(messages, chat_obj.temperature, chat_obj.presence_penalty, chat_obj.frequency_penalty)
        except Exception as e:
            logger.error(e)
            return JsonResponse({'error': f"{e}"}, status=500)

        # Create ChatMessage object with user input
        new_message = ChatMessage.objects.create(chat_id=chat_obj.pk)
        new_message.content = message
        new_message.save()

        # Parse response
        response_message = response.choices[0].message.content
        logger.info('API response: {}'.format(response_message))

        # Create ChatMessage object for Assistant response
        new_message = ChatMessage.objects.create(chat_id=chat_obj.pk)
        new_message.content = response_message
        new_message.role = ChatMessage.ASSISTANT
        new_message.completion_tokens = response.usage.completion_tokens
        new_message.prompt_tokens = response.usage.prompt_tokens
        new_message.total_tokens = response.usage.total_tokens
        new_message.save()

        return JsonResponse({}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=500)


def create_chat(request):
    if request.method == 'POST':
        form = ChatForm(request.POST)
        if form.is_valid():
            chat = form.save()
            return redirect(reverse('chatgpt_api_ui:chat_pk', args=[chat.pk]))
    else:
        initial_values = {'temperature': 1, 'presence_penalty': 0, 'frequency_penalty': 0}
        form = ChatForm(initial=initial_values)

    return render(request, 'chatgpt_api_ui/new_chat.html', {'form': form})
