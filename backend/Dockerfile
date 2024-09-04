# backend/Dockerfile

# Use the official Python image from the Docker Hub
FROM python:3.10

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the container
COPY myapp/django-requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r django-requirements.txt

# Copy the Django project files into the container
COPY myapp/ .

# Expose the port Django will run on
EXPOSE 8000

# Set the default command to run the Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
