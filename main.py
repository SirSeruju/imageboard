from flask import Flask
from database.db_session import *
from flask_restful import Api
from api import ThreadResource

app = Flask(__name__)
api = Api(app)

api.add_resource(ThreadResource, '/api/threads/<int:thread_id>')

def main():
    global_init("threads.db")
    app.run()

if __name__ == '__main__':
    main()
