from itertools import islice
from os import environ


def get_usage(td):
    if not hasattr(get_usage, 'n'):
        get_usage.n = 1

    with open(environ['USAGE_DATA_FILE'], 'r') as usage_data:
        print(usage_data)
        print(get_usage.n)
        print(td.total_seconds())
        data_list = [float(n) for n in islice(usage_data, get_usage.n,
                                               get_usage.n + int(td.total_seconds()//60))]
        get_usage.n += int(td.total_seconds()//60)
        return data_list
