from django.db import connection


def query_by_count(count=50, skip=0):
	"""
	Query movie table by count
	"""
    with connection.cursor() as cursor:
        query = 'SELECT * FROM showvies_movie LIMIT %%s OFFSET %%s;'
        cursor.execute(query, (count, skip))
        return cursor.fetchall()


def query_by_provider(providers):
	"""
	Query movie table by provider
	"""
    with connection.cursor() as cursor:
        query = 'SELECT * FROM showvies_movie WHERE provider in (%%s);'
        cursor.execute(query, (providers,))
        return cursor.fetchall()


def query_by_genre(genre):
	"""
	Query movie table by genre name
	"""
    with connection.cursor() as cursor:
        query = 'SELECT * from showevies_movie WHERE id IN (SELECT movie_id FROM showvies_moviegenre WHERE genre_id IN (SELECT genre_id FROM showvies_genre WHERE name = %%s));'
        cursor.execute(query, (genre,))
        return cursor.fetchall()


def query_by_title(title):
	"""
	Query movie table by title
	"""
    with connection.cursor() as cursor:
        query = 'SELECT genre_id FROM showvies_movie WHERE name == %%s;'
        cursor.execute(query, (title,))
        return cursor.fetchall()