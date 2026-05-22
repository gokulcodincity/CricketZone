from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.config.db import connect_db

from app.routes.player_routes import router as player_router
from app.routes.team_routes import router as team_router

app = FastAPI()


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routes
app.include_router(player_router)
app.include_router(team_router)


# Database Connection
@app.on_event("startup")
async def startup():

    await connect_db()