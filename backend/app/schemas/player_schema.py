from pydantic import BaseModel

from typing import Optional


class PlayerCreate(BaseModel):

    name: str
    country: str
    role: str
    matches: int

    runs: Optional[int] = None
    average: Optional[float] = None

    wickets: Optional[int] = None
    economy: Optional[float] = None


class PlayerResponse(PlayerCreate):
    pass