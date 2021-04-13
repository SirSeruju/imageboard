import sqlalchemy
from .db_session import SqlAlchemyBase

class User(SqlAlchemyBase):
	__tablename__ = 'messages'

	id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
	speciality = sqlalchemy.Column(sqlalchemy.String)
