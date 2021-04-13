import sqlalchemy
from .db_session import SqlAlchemyBase

class Threads(SqlAlchemyBase):
    __tablename__ = 'threads'

    id     = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    parent = sqlalchemy.Column(sqlalchemy.Integer)
    body   = sqlalchemy.Column(sqlalchemy.String)
