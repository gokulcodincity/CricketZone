from motor.motor_asyncio import AsyncIOMotorClient

from beanie import init_beanie

from dotenv import load_dotenv

import os

from app.models.player_model import Player
from app.models.team_model import Team

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

DATABASE_NAME = os.getenv("DATABASE_NAME")


async def connect_db():

    client = AsyncIOMotorClient(MONGO_URL)

    database = client[DATABASE_NAME]

    await init_beanie(
        database=database,
        document_models=[Player, Team]
    )