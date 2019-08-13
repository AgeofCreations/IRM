FROM python:buster


ENV PYTHONUNBUFFERED 1

COPY app /app
WORKDIR /app/backend


# COPY ./docker/prod/python/entrypoint.sh /entrypoint.sh

RUN pip install -r ./requirements/prod.txt
# RUN chmod +x /entrypoint.sh

# ENTRYPOINT [ "/entrypoint.sh" ]