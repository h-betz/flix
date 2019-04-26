from decimal import Decimal

def format_movie_results(raw_movies):
    """
    Format the raw sql query result to a list of python dicts
    :param raw_movies:
    :return:
    """
    movies = []
    for movie in raw_movies:
        movies.append({
            'id': movie[0],
            'title': movie[1],
            'imdb_rating': float(movie[2]),
            'rt_rating': movie[3],
            'description': movie[4],
            'movie_id': movie[5],
            'thumbnail_url': movie[6],
            'providers': []
        })
    return movies