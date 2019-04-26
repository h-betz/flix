from django.shortcuts import render
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from aggregation import db_api, format_data
import json

# Create your views here.
@api_view(['GET', 'POST', 'OPTIONS'])
@csrf_exempt
def fetch(request, count=50, skip=0):
    if request.GET.get('count'): count = int(request.GET.get('count'))
    if request.GET.get('skip'): skip = int(request.GET.get('skip'))
    raw_movies = db_api.query_by_count(count, skip)
    movies = format_data.format_movie_results(raw_movies)
    # movies = [
    #     {
    #         'id': 1,
    #         'title': 'Logan',
    #         'thumbnail': 'https://www.jposter.net/images/products/b5-logan.jpg',
    #         'imdb_rating': 9.5,
    #         'rt_rating': 92,
    #         'providers': ['Netflix', 'Hulu'],
    #     },
    #     {
    #         'id': 2,
    #         'title': 'Iron Man',
    #         'thumbnail': 'https://images-na.ssl-images-amazon.com/images/I/31UiPirP4GL.jpg',
    #         'imdb_rating': 9.1,
    #         'rt_rating': 87,
    #         'providers': ['Netflix', 'Hulu'],
    #     },
    #     {
    #         'id': 3,
    #         'title': 'Dunkirk',
    #         'thumbnail': 'https://images-na.ssl-images-amazon.com/images/I/91a9Ez60pmL._SY606_.jpg',
    #         'imdb_rating': 9.8,
    #         'rt_rating': 98,
    #         'providers': ['Netflix', 'Hulu'],
    #     },
    #     {
    #         'id': 4,
    #         'title': 'Saving Private Ryan',
    #         'thumbnail': 'https://images-na.ssl-images-amazon.com/images/I/41zN6HGkL1L.jpg',
    #         'imdb_rating': 9.8,
    #         'rt_rating': 98,
    #         'providers': ['Netflix', 'Hulu'],
    #     },
    #     {
    #         'id': 5,
    #         'title': 'Whiplash',
    #         'thumbnail': 'https://images-na.ssl-images-amazon.com/images/I/516noX3aE9L.jpg',
    #         'imdb_rating': 9.7,
    #         'rt_rating': 100,
    #         'providers': ['Netflix', 'Hulu'],
    #     },
    # ]
    return Response(movies)


@api_view(['POST', 'OPTIONS'])
@csrf_exempt
def search(request):
    data = request.body.decode("utf-8")
    json_data = json.loads(data)
    title = json_data.get('title')
    provider = json_data.get('provider')
    response = {'success': True}
    return Response(response)
