from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class CandlestickDataAPIView(APIView):
    def get(self, request):
        try:
            data = {
                "data": [
                    {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
                    {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40},
                    {"x": "2023-01-03", "open": 40, "high": 50, "low": 35, "close": 45},
                ]
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LineChartDataAPIView(APIView):
    def get(self, request):
        try:
            data = {
                "labels": ["Jan", "Feb", "Mar", "Apr"],
                "data": [10, 20, 30, 40]
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BarChartDataAPIView(APIView):
    def get(self, request):
        try:
            data = {
                "labels": ["Product A", "Product B", "Product C"],
                "data": [100, 150, 200]
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PieChartDataAPIView(APIView):
    def get(self, request):
        try:
            data = {
                "labels": ["Item1", "Item2", "Item3"],
                "data": [300, 50, 100]
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
