from django.db import connection


def query_by_provider(providers):
    with connection.cursor() as cursor:
        query = 'SELECT * FROM showvies_movie WHERE provider in (%%s);'
        cursor.execute(query, providers)
        return cursor.fetchall()


def query_by_genre(genres):
    with connection.cursor() as cursor:
        query = 'SELECT genre_id FROM showvies_genre WHERE name IN (%%s);'
        cursor.execute(query, genres)
        genre_ids = cursor.fetchall()
        query = 'SELECT * FROM showvies_movie WHERE genre_id IN (SELECT g[s] FROM ' \
                '(SELECT generate_subscripts(genres, 1) AS s, genres FROM showvies_movies) g);'
        cursor.execute(query, genres)
        return cursor.fetchall()


def query_by_title(title):
    with connection.cursor() as cursor:
        query = 'SELECT genre_id FROM showvies_movie WHERE name == %%s;'
        cursor.execute(query, (title,))
        return cursor.fetchall()