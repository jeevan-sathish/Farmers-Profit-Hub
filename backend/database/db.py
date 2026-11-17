
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
import os


load_dotenv()

SQLALCHEMY_DATABASE_URL =os.getenv("NEON_POSTGRESS_URL")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    
)

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False
)

class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
