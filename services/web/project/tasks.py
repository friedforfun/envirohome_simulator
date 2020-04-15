from project import create_celery_app, app

celery = create_celery_app(app)


@celery.task
def hello_world_async():
    print('hello world!')
