from ChatGPT_WebUI.settings.base import *

try:
    CHAT_GPT_API_KEY = os.environ["CHAT_GPT_API_KEY"]
except KeyError:
    raise KeyError("OpenAi API key missing.")


if os.environ.get("DEVELOPMENT"):
    from ChatGPT_WebUI.settings.development import *
else:
    from ChatGPT_WebUI.settings.production import *
