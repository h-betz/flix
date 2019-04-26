from aggregation.aggregators import netflix, hulu, hbo, amazon_prime, genres
from aggregation import db_api, format_data
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
    print("Getting genres.")
    sync_genres()
    print("Getting movies.")
    aggregate()
    print("Finished")


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

        for genre_id in genres:
            # Update the MovieGenre table with the new relation
            genre = db_api.get_genre({'genre_id': genre_id})
            movie_genre = MovieGenre(movie=movie, genre=genre)
            movie_genre.save()

        # Update provider table with this new relation
        provider = movie_details.pop('provider')
        p = Provider(movie=movie, name=provider)
        p.save()


if __name__ == "__main__":
    aggregate()