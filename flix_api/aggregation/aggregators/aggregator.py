import requests

class Aggregator(requests.Session):

    def __init__(self):
        super().__init__()

    def aggregate(self):
        pass

    def get_data(self):
        pass

    def parse(self, data):
        pass