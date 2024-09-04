from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

class ChartsApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_candlestick_data(self):
        response = self.client.get('/api/charts-api/candlestick-data/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # print(response)
        self.assertIn('data', response.json())

    def test_line_chart_data(self):
        response = self.client.get('/api/charts-api/line-chart-data/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('labels', response.json())
        self.assertIn('data', response.json())
