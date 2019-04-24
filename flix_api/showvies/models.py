from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=90)
    imdb_rating = models.DecimalField(max_digits=5, decimal_places=2)
    rt_rating = models.IntegerField()
    description = models.TextField()
    movie_id = models.CharField(max_length=60)
    thumbnail_url = models.TextField()
    providers = ArrayField(models.CharField(max_length=50), size=15)


class Genre(models.Model):
    name = models.CharField(max_length=60)
    genre_id = models.IntegerField(primary_key=True)


class MovieGenre(models.Model):
    movie_id = models.ForeignKey('Movie', on_delete=models.CASCADE)
    genre_id = models.ForeignKey('Genre', on_delete=models.CASCADE)