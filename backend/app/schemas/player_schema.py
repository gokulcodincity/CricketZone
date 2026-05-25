from pydantic import BaseModel

from typing import Optional


# This schema is used when CREATING a new player
# All fields are required (except runs, average, wickets, economy)
class PlayerCreate(BaseModel):

    name: str
    country: str
    role: str
    matches: int

    runs: Optional[int] = None
    average: Optional[float] = None

    wickets: Optional[int] = None
    economy: Optional[float] = None


# This schema is used when UPDATING an existing player
# All fields are optional — we only update what is sent
class PlayerUpdate(BaseModel):

    name: Optional[str] = None
    country: Optional[str] = None
    role: Optional[str] = None
    matches: Optional[int] = None

    runs: Optional[int] = None
    average: Optional[float] = None

    wickets: Optional[int] = None
    economy: Optional[float] = None


class PlayerResponse(PlayerCreate):
    pass