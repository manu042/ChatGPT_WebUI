from ChatGPT_WebUI.settings.base import *

CHAT_GPT_API_KEY = os.environ.get("CHAT_GPT_API_KEY2")

if os.environ.get("DEVELOPMENT"):
    from ChatGPT_WebUI.settings.development import *
else:
    from ChatGPT_WebUI.settings.production import *
