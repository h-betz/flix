from decimal import Decimal

def format_media_results(raw_media):
    """
    Format the raw sql query result to a list of python dicts
    :param raw_movies:
    :return:
    """
    content = {}
    for media in raw_media:
        media_id = media[0]
        if media_id in content:
            content[media_id]['genres'].append(media[8])
            content[media_id]['providers'].add(media[9])
        else:
            providers = set()
            providers.add(media[9])
            content[media_id] = {
                'id': media[0],
                'title': media[1],
                'imdb_rating': float(media[2]),
                'rt_rating': media[3],
                'description': media[4],
                'movie_id': media[5],
                'thumbnail_url': media[6],
                'genres': [media[8]],
                'providers': providers,
            }
    return content.values()


def format_genre_results(raw_genres):
    """
    Format the raw sql query result to a list of python dicts
    :param raw_genres: List of genre objects from our query results
    :return: List of dicts with each item corresponding to a genre
    """
    genres = []
    for genre in raw_genres:
        genres.append({
            'id': genre.genre_id,
            'name': genre.name,
        })
    return genres