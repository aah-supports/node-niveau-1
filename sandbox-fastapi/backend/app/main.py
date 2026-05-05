from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .db import db_ping, init_db

app = FastAPI(title="sandbox-fastapi", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "fastapi"}


@app.get("/api/message")
def message() -> dict:
    return {
        "message": "Hello from FastAPI",
        "stack": "fastapi + postgres + react",
    }


@app.get("/api/db-check")
def database_check() -> dict:
    try:
        db_ping()
        return {"database": "reachable"}
    except Exception as error:  # pragma: no cover
        raise HTTPException(status_code=500, detail=f"Database error: {error}")
