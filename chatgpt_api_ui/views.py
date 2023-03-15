import openai
import logging
from datetime import datetime

from django.conf import settings
from django.shortcuts import render, redirect
from django.http import JsonResponse
from chatgpt_api_ui.models import Chat, ChatMessage
from django.contrib.auth.decorators import login_required
from chatgpt_api_ui.forms import ChatForm


logger = logging.getLogger('chatgpt_webui')


@login_required(login_url='/admin/login/')
def chat_view(request, pk=None):

    context = {}
    if request.method == "GET":
        messages = ChatMessage.objects.all()
        chats = Chat.objects.all()
        context = {
            "chats": chats,
            "messages": messages
        }

    return render(request, 'chatgpt_api_ui/chat_view.html', context)


@login_required
def chat_completion(request):
    if request.method == "POST":
        chat_obj = Chat.objects.get_or_create(pk=1)[0]

        # Get message from request
        message = request.POST.get("message")

        logger.info('New message: {}'.format(message))

        # Create ChatMessage object with user input
        new_message = ChatMessage.objects.create(chat_id=chat_obj.pk)
        new_message.content = message
        new_message.save()

        # Create messages list
        today = datetime.now().strftime("%d.%m.%Y")

        messages = list()
        messages.append({"role": "system", "content": chat_obj.system_role.description.replace("{{date}}", today)})

        messages_obj = ChatMessage.objects.all()
        for msg in messages_obj:
            messages.append({"role": msg.role, "content": msg.content})

        # https://platform.openai.com/docs/guides/chat/introduction
        openai.api_key = settings.CHAT_GPT_API_KEY
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages,
                temperature=float(chat_obj.temperature),
                presence_penalty=float(chat_obj.presence_penalty),
                frequency_penalty=float(chat_obj.frequency_penalty)
            )
        except Exception as e:
            logger.error('{}'.format(e))
            return JsonResponse({"message": f"Error: {e}"})

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

        return JsonResponse({"message": response_message})
    else:
        return JsonResponse({"error": "Invalid request method"})


def create_chat(request):
    if request.method == 'POST':
        form = ChatForm(request.POST)
        if form.is_valid():
            chat = form.save()
            # do something with the new Chat object
            return redirect('home')  # redirect to the home page
    else:
        form = ChatForm()
    return render(request, 'chatgpt_api_ui/new_chat.html', {'form': form})
