from fastapi import APIRouter

from app.services.team_service import (
    get_all_teams
)

router = APIRouter()


@router.get("/teams")
async def fetch_teams():

    return await get_all_teams()