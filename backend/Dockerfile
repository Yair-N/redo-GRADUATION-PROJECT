FROM python:3.10

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

ENTRYPOINT ["python", "./manage.py"]
CMD ["runserver"]

EXPOSE 8000
