from django.shortcuts import render
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from aggregation import db_api, format_data
from utils import parse_post_data
import json

# Create your views here.
"""
Endpoint for handling scrolling/loading on home page
"""
@api_view(['GET', 'POST', 'OPTIONS'])
@csrf_exempt
def fetch(request, count=50, skip=0):
    if request.GET.get('count'): count = int(request.GET.get('count'))
    if request.GET.get('skip'): skip = int(request.GET.get('skip'))
    raw_media = db_api.query_by_count(count, skip)
    media = format_data.format_media_results(raw_media)
    return Response(media)


"""
Endpoint for handling search
"""
@api_view(['POST', 'OPTIONS'])
@csrf_exempt
def search(request):
    data = request.body.decode("utf-8")
    json_data = json.loads(data)
    post_data = parse_post_data(json_data)
    title = post_data.get('title')
    provider = post_data.get('providers')
    genre = post_data.get('genre')
    results = []
    if title and provider:
        # TODO add support
        pass
    elif title:
        raw_results = db_api.query_by_title(title)
        results = format_data.format_media_results(raw_results)
    elif provider:
        pass
    return Response(results)


"""
End point for returning a list of genres
"""
@api_view(['GET', 'OPTIONS'])
@csrf_exempt
def genres(request):
    raw_genres = db_api.get_generes()
    genres = format_data.format_genre_results(raw_genres)
    return Response(genres)


"""
Endpoint for the movie page
"""
@api_view(['GET', 'OPTIONS'])
@csrf_exempt
def flix(request):
    data = request.body.decode("utf-8")
    media_id = request.GET.get('id')
    raw_result = db_api.query_by_id(media_id)
    if not raw_result:
        return Response({})
    result = format_data.format_media_results(raw_result)
    return Response(result)