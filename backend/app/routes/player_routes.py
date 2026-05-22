from fastapi import APIRouter

from app.schemas.player_schema import PlayerCreate

from app.services.player_service import (
    get_all_players,
    get_single_player,
    get_players_by_country,
    create_player
)

router = APIRouter()


@router.get("/players")
async def fetch_players():

    return await get_all_players()


@router.get("/players/{id}")
async def fetch_player(id: str):

    return await get_single_player(id)


@router.get("/players/country/{country}")
async def fetch_country_players(country: str):

    return await get_players_by_country(country)


@router.post("/players")
async def add_player(player: PlayerCreate):

    return await create_player(player)