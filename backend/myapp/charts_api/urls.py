from django.urls import path
from .views import CandlestickDataAPIView, LineChartDataAPIView, BarChartDataAPIView, PieChartDataAPIView

urlpatterns = [
    path('candlestick-data/', CandlestickDataAPIView.as_view(), name='candlestick-data'),
    path('line-chart-data/', LineChartDataAPIView.as_view(), name='line-chart-data'),
    path('bar-chart-data/', BarChartDataAPIView.as_view(), name='bar-chart-data'),
    path('pie-chart-data/', PieChartDataAPIView.as_view(), name='pie-chart-data'),
]
