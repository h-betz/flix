from django.core.management.base import BaseCommand, CommandError
from showvies.models import Genre, Media, MediaGenre, Provider
from aggregation.sync import sync

class Command(BaseCommand):
    help = 'Performs the actions to seed the database'

    def handle(self, *args, **options):
        sync()