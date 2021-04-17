from flask import Flask, make_response, jsonify, render_template
from database.db_session import *
from flask_restful import Api
from api import ThreadResource, ThreadListResource
from database.thread import Thread

app = Flask(__name__)
api = Api(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True

api.add_resource(ThreadResource, '/api/threads/<int:thread_id>')
api.add_resource(ThreadListResource, '/api/threads')

@app.route("/<int:thread_id>")
def getThread(thread_id):
    db_sess = create_session()
    parent = db_sess.query(Thread).get(thread_id)
    if not parent:
        return make_response(jsonify({"error": "Not found"}), 404)
    threads = db_sess.query(Thread).filter(Thread.parent == thread_id).all()
    db_sess.close()
    return render_template("index.html", parent=parent, threads=threads)

def main():
    global_init("threads.db")
    app.run()

if __name__ == '__main__':
    main()
