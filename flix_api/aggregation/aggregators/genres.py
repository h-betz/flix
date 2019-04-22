from aggregation.aggregators import aggregator
import json
import re


class Aggregator(aggregator.Aggregator):

    def get_genres(self):
        home_page = self.get('https://reelgood.com')
        raw_genres = '[' + re.search('genres":\[(.*?)\]', home_page.content).group(1) + ']'
        cooked = json.loads(raw_genres)
        for genre in cooked:
            yield {
                'genre_id': genre.get("id"),
                'name': genre.get('name')
            }