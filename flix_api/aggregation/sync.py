from aggregation.aggregators import netflix, hulu, hbo, amazon_prime, genres
from aggregation import db_api, format_data
from showvies.models import Media, Genre, MediaGenre, Provider
from threading import Thread
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


def aggregate():
    """
    Start aggregation processes for all of our aggregators
    :return:
    """
    aggregators = [netflix, hbo, hulu, amazon_prime]
    # aggregators = [netflix]
    threads = []
    for aggregator in aggregators:
        agg = aggregator.Aggregator()
        print(agg.name)
        t = Thread(target=handle_aggregator, args=(agg.name, agg))
        t.start()
        threads.append(t)

    for t in threads:
        t.join()


def handle_aggregator(thread_name, aggregator):
    """
    Handle the responses from the aggregator
    :param thread_name: Name of the aggregator (netflix, hbo, etc)
    :param aggregator: Aggregator object performing the aggregation
    :return:
    """
    aggregator.aggregate()
    for media_details in aggregator.get_data():
        genres = media_details.pop('genres')
        media = Media(**media_details)
        media.save()

        for genre_id in genres:
            # Update the MediaGenre table with the new relation
            genre = db_api.get_genre({'genre_id': genre_id})
            movie_genre = MediaGenre(media=media, genre=genre)
            movie_genre.save()

        # Update provider table with this new relation
        provider = media_details.pop('provider')
        p = Provider(media=media, name=provider)
        p.save()


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

if __name__ == "__main__":
    aggregate()