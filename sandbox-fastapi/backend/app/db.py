import os
from sqlalchemy import create_engine, text

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://app:app@postgres:5432/appdb",
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True, future=True)


def init_db() -> None:
    with engine.begin() as connection:
        connection.execute(
            text(
                """
                CREATE TABLE IF NOT EXISTS notes (
                    id SERIAL PRIMARY KEY,
                    content TEXT NOT NULL,
                    created_at TIMESTAMPTZ DEFAULT NOW()
                )
                """
            )
        )


def db_ping() -> bool:
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
    return True
