from aggregation.aggregators import aggregator
import json


class Aggregator(aggregator.Aggregator):

    def aggregate(self):
        self.headers = {
            'Referer': 'https://reelgood.com/',
            'Origin': 'https://reelgood.com',
            'x-platform': 'web',
        }
        self.name = 'HBO'