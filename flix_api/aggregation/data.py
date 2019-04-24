def format_movie_results(raw_movies):
    movies = []
    for movie in raw_movies:
        movies.append({
            'title': movie.get('title'),
            'description': movie.get('description'),
            'thumbnail_url': movie.get('thumbnail_url'),
            'providers': movie.get('provider')
        })