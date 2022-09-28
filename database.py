import os
import json
from pkg_resources import get_supported_platform
from flask import Flask, render_template

class MAINDB():
    def __init__(self):
        pass
def get_now():
    import pytz
    from datetime import datetime
    taipei = pytz.timezone('Asia/Taipei')
    now = datetime.now(taipei)
    return now

def get_datetime():
    now = get_now()
    return now.strftime("%Y-%m-%d %H:%M:%S")

if __name__ == '__main__':
    db = MAINDB()

