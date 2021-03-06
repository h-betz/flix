from aggregation.aggregators import aggregator
import json


class Aggregator(aggregator.Aggregator):

    def __init__(self):
        super(Aggregator, self).__init__()
        self.name = 'Hulu'

    def aggregate(self):
        self.headers = {
            'Referer': 'https://reelgood.com/',
            'Origin': 'https://reelgood.com',
            'x-platform': 'web',
        }

    def get_data(self):
        """
        Perform the requests to retrieve the content available on hulu.
        :return: Dictionary containing values for a movie model
        """
        skip = 0
        base_url = 'https://api.reelgood.com/v2/browse/source/hulu'
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
            'overriding_sources': 'hulu',
            'rt_end': '100',
            'rt_start': '0',
            'skip': skip,
            'sort': '0',
            'sources': 'hulu',
            'take': '50',
            'year_end': '2019',
            'year_start': '1900',
        }
        for i in range(10):
            params['skip'] = skip
            media_req = self.get(base_url, params=params)
            skip += 100
            for media in media_req.json():
                yield self.parse(media)