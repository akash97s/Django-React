import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class UserDataAPIView(APIView):
    def get(self, request):
        try:
            response = requests.get('https://jsonplaceholder.typicode.com/users')
            response.raise_for_status()  # Check if the request was successful
            return Response(response.json(), status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PostDataAPIView(APIView):
    def get(self, request):
        try:
            response = requests.get('https://jsonplaceholder.typicode.com/posts')
            response.raise_for_status()  # Check if the request was successful
            return Response(response.json(), status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
