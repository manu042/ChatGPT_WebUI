from ChatGPT_WebUI.settings.base import *


if os.environ.get("DEVELOPMENT"):
    from ChatGPT_WebUI.settings.development import *
else:
    from ChatGPT_WebUI.settings.production import *
