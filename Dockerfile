FROM python:3.12-slim




RUN mkdir /app 

WORKDIR /app

COPY . .

# RUN pip install --no-cache-dir -r requirements.txt

# CMD [ "python", "main.py" ]

# EXPOSE 8000