from flask_restful import reqparse, abort, Resource
from flask import jsonify
from database.thread import Thread
from database import db_session


def abort_if_thread_not_found(thread_id):
    session = db_session.create_session()
    thread = session.query(Thread).get(thread_id)
    if not thread:
        abort(404, message=f"Thread {thread_id} not found")

get_parser = reqparse.RequestParser()
get_parser.add_argument('last_id',  required=False, type=int)
get_parser.add_argument('max_size', required=False, type=int)


class ThreadResource(Resource):
    def get(self, thread_id):
        abort_if_thread_not_found(thread_id)
        args = get_parser.parse_args()
        last_id = -1
        if args['last_id']:
            last_id = args['last_id']
        session = db_session.create_session()
        parent = session.query(Thread).get(thread_id).to_dict()
        threads = session.query(Thread).filter(Thread.parent == thread_id, Thread.id > last_id)
        if args['max_size']:
            threads = threads.limit(args['max_size']).all()
        else:
            threads = threads.all()
        threads = list(map(lambda x: x.to_dict(), threads))
        return jsonify({'parent': parent,
                        'threads': threads})
