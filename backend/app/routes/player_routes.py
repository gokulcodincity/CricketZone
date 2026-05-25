from fastapi import APIRouter

from app.schemas.player_schema import PlayerCreate, PlayerUpdate

from app.services.player_service import (
    get_all_players,
    get_single_player,
    get_players_by_country,
    create_player,
    update_player,
    delete_player
)

router = APIRouter()


# GET ALL PLAYERS
@router.get("/players")
async def fetch_players():

    return await get_all_players()


# GET SINGLE PLAYER BY ID
@router.get("/players/{id}")
async def fetch_player(id: str):

    return await get_single_player(id)


# GET PLAYERS BY COUNTRY
@router.get("/players/country/{country}")
async def fetch_country_players(country: str):

    return await get_players_by_country(country)


# CREATE A NEW PLAYER
@router.post("/players")
async def add_player(player: PlayerCreate):

    return await create_player(player)


# UPDATE AN EXISTING PLAYER
@router.put("/players/{id}")
async def edit_player(id: str, player: PlayerUpdate):

    return await update_player(id, player)


# DELETE A PLAYER
@router.delete("/players/{id}")
async def remove_player(id: str):

    return await delete_player(id)