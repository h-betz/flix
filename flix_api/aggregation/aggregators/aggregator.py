import requests

class Aggregator(requests.Session):

    def __init__(self):
        super().__init__()

    def aggregate(self):
        pass

    def get_data(self):
        pass

    def parse(self, media):
        """
        Parse our media object. Extract the data we want
        :param data: Request response content
        :return:
        """
        thumbnail_url = 'https://img.reelgood.com/content/movie/%s/poster-342.jpg' % media.get('id')
        if media.get('content_type') == 's':
            # This is a show, not a movie
            thumbnail_url = 'https://img.reelgood.com/content/show/%s/poster-342.jpg' % media.get('id')
        return {
            'imdb_rating': media.get('imdb_rating'),
            'title': media.get('title'),
            'description': media.get('overview'),
            'rt_rating': media.get('rt_critics_rating'),
            'movie_id': media.get('id'),
            'genres': media.get('genres'),
            'thumbnail_url': thumbnail_url,
            'provider': self.name,
            'content_type': media.get('content_type'),
        }