import os


basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
	# Get database URL from the environment variable defined in .env.dev file
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False