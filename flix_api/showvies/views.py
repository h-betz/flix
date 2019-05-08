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
    raw_media = db_api.query_by_count(count, skip)
    media = format_data.format_media_results(raw_media)
    return Response(media)


@api_view(['POST', 'OPTIONS'])
@csrf_exempt
def search(request):
    data = request.body.decode("utf-8")
    json_data = json.loads(data)
    title = json_data.get('title')
    provider = json_data.get('provider')
    results = []
    if title and provider:
        pass
    elif title:
        raw_results = db_api.query_by_title(title)
        results = format_data.format_media_results(raw_results)
    return Response(results)


@api_view(['GET', 'OPTIONS'])
@csrf_exempt
def genres(request):
    raw_genres = db_api.get_generes()
    genres = format_data.format_genre_results(raw_genres)
    return Response(genres)