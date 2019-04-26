from aggregation.aggregators import aggregator
import json


class Aggregator(aggregator.Aggregator):

    def __init__(self):
        super(Aggregator, self).__init__()
        self.name = 'Netflix'

    def aggregate(self):
        """
        Initialize some things for aggregation
        :return:
        """
        self.headers = {
            'Referer': 'https://reelgood.com/',
            'Origin': 'https://reelgood.com',
            'x-platform': 'web',
        }

    # def parse(self, media):
    #     """
    #     Parse our movie object. Extract the data we want
    #     :param data: Request response content
    #     :return:
    #     """
    #     thumbnail_url = 'https://img.reelgood.com/content/movie/%s/poster-342.jpg' % media.get('id')
    #     if media.get('content_type') == 's':
    #         # This is a show, not a movie
    #         thumbnail_url = 'https://img.reelgood.com/content/show/%s/poster-342.jpg' % media.get('id')
    #     return {
    #         'imdb_rating': media.get('imdb_rating'),
    #         'title': media.get('title'),
    #         'description': media.get('overview'),
    #         'rt_rating': media.get('rt_critics_rating'),
    #         'movie_id': media.get('id'),
    #         'genres': media.get('genres'),
    #         'thumbnail_url': thumbnail_url,
    #         'provider': self.name,
    #         'content_type': media.get('content_type'),
    #     }

    def get_data(self):
        """
        Perform the requests to retrieve the content available on netlfix.
        :return: Dictionary containing values for a movie model
        """
        skip = 0
        base_url = 'https://api.reelgood.com/v2/browse/source/netflix'
        params = {
            'availability': 'onSources',
            'content_kind': 'both',
            'hide_seen': 'false',
            'hide_tracked': 'false',
            'hide_watchlisted': 'false',
            'imdb_end': '10',
            'imdb_start': '0',
            'override_user_sources': 'true',
            'overriding_free': 'false',
            'overriding_sources': 'netflix',
            'rt_end': '100',
            'rt_start': '0',
            'skip': skip,
            'sort': '0',
            'sources': 'netflix',
            'take': '50',
            'year_end': '2019',
            'year_start': '1900',
        }
        for i in range(5):
            params['skip'] = skip
            media_req = self.get(base_url, params=params)
            skip += 50
            for media in media_req.json():
                yield self.parse(media)