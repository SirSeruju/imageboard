import sqlalchemy
from sqlalchemy_serializer import SerializerMixin
from .db_session import SqlAlchemyBase

class Thread(SqlAlchemyBase, SerializerMixin):
    __tablename__ = 'threads'

    id     = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    parent = sqlalchemy.Column(sqlalchemy.Integer)
    body   = sqlalchemy.Column(sqlalchemy.String)
