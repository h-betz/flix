from aggregation.aggregators import netflix, hulu, hbo, amazon_prime, genres
from aggregation import db_api, data
from showvies.models import *
import _thread
import json


def sync_genres():
    """
    Sync the list of available genres
    :return:
    """
    genre = genres.Aggregator()
    for g in genre.get_genres():
        genre = Genre(**g)
        genre.save()


def sync():
    """
    Perform requests and operations necessary to initialize the database
    :return:
    """
    sync_genres()
    aggregate()


def aggregate():
    """
    Start aggregation processes for all of our aggregators
    :return:
    """
    # aggregators = [netflix, hbo, hulu, amazon_prime]
    aggregators = [netflix]
    for aggregator in aggregators:
        agg = aggregator.Aggregator()
        print(agg.name)
        _thread.start_new_thread(handle_aggregator, (agg.name, agg))


def handle_aggregator(thread_name, aggregator):
    """
    Handle the responses from the aggregator
    :param thread_name: Name of the aggregator (netflix, hbo, etc)
    :param aggregator: Aggregator object performing the aggregation
    :return:
    """
    aggregator.aggregate()
    for movie_details in aggregator.get_data():
        genres = movie_details.pop('genres')
        movie = Movie(**movie_details)
        movie.save()
        for genre in genres:
            movie_genre = MovieGenre(**{'movie_id': movie.id, 'genre_id': genre})
            movie_genre.save()


if __name__ == "__main__":
    aggregate()