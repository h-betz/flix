from django.db import connection
from showvies.models import Genre


def query_by_count(count=50, skip=0):
	"""
	Query movie table by count
	"""
	with connection.cursor() as cursor:
		query = "	SELECT x.* FROM (SELECT t.*, g.name as genre, p.name\
					FROM showvies_mediagenre as mg\
					INNER JOIN showvies_genre as g ON\
					mg.genre_id = g.genre_id\
					INNER JOIN showvies_provider as p\
					ON p.media_id = mg.media_id\
					INNER JOIN (SELECT * FROM showvies_media LIMIT %s OFFSET %s) t ON t.id = mg.media_id) x;"
		cursor.execute(query, (count, skip))
		return cursor.fetchall()


def query_by_provider(providers):
	"""
	Query movie table by provider
	"""
	with connection.cursor() as cursor:
		query = 'SELECT * FROM showvies_media WHERE provider in (%s);'
		cursor.execute(query, (providers,))
		return cursor.fetchall()


def query_by_genre(genre):
	"""
	Query movie table by genre name
	"""
	with connection.cursor() as cursor:
		query = 'SELECT * from showvies_media WHERE id IN (SELECT media_id FROM showvies_mediagenre WHERE genre_id IN (SELECT genre_id FROM showvies_genre WHERE name = %s));'
		cursor.execute(query, (genre,))
		return cursor.fetchall()


def query_by_title(title):
	"""
	Query movie table by title
	"""
	with connection.cursor() as cursor:
		title = '%' + title + '%'
		query = "SELECT * FROM showvies_media WHERE title LIKE %s;"
		cursor.execute(query, (title,))
		return cursor.fetchall()


def get_genre(fields):
	"""
	Return the Genre model object specified by the keyword arguments in fields
	:param genre_name:
	:return:
	"""
	return Genre.objects.filter(**fields)[0]


def get_generes():
	"""
	Return all Genre items in our database
	"""
	return Genre.objects.all()