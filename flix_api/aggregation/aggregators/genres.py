from aggregation.aggregators import aggregator
import json
import re


class Aggregator(aggregator.Aggregator):

    def get_genres(self):
        home_page = self.get('https://reelgood.com/', headers={
            'authority': 'reelgood.com',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'accept-language': 'en-US,en;q=0.9',
        })
        raw = re.findall('genres":\[(.*?)\]', str(home_page.content))
        for r in raw:
            if r.startswith('{'):
                raw_genres = '[' + r + ']'
                break
        cooked = json.loads(raw_genres)
        for genre in cooked:
            yield {
                'genre_id': genre.get("id"),
                'name': genre.get('name')
            }