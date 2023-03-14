FROM python

ARG DJANGO_SUPERUSER_USERNAME=admin
ARG DJANGO_SUPERUSER_PASSWORD=admin
ARG DJANGO_SUPERUSER_EMAIL="admin@example.com"


RUN pip install Django==4.0.2 openai==0.27.2 djangorestframework

COPY .. /root/ChatGPT_WebUI

EXPOSE 8000

WORKDIR /root/ChatGPT_WebUI

RUN python manage.py makemigrations && \
    python manage.py migrate && \
    python manage.py createsuperuser --noinput && \
    python manage.py loaddata initial_data.json

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
