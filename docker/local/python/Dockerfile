FROM python:buster

ENV PYTHONUNBUFFERED 1

COPY ./app /app
WORKDIR /app


COPY ./docker/local/python/entrypoint.sh /entrypoint.sh

RUN pip install -r requirements/local.txt
# RUN chmod +x /entrypoint.sh

# ENTRYPOINT [ "/entrypoint.sh" ]