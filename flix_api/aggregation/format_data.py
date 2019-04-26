from decimal import Decimal

def format_media_results(raw_media):
    """
    Format the raw sql query result to a list of python dicts
    :param raw_movies:
    :return:
    """
    content = []
    for media in raw_media:
        content.append({
            'id': media[0],
            'title': media[1],
            'imdb_rating': float(media[2]),
            'rt_rating': media[3],
            'description': media[4],
            'movie_id': media[5],
            'thumbnail_url': media[6],
            'providers': []
        })
    return content