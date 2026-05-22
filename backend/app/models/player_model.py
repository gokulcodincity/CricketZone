from beanie import Document

from typing import Optional


class Player(Document):

    name: str
    country: str
    role: str
    matches: int

    runs: Optional[int] = None
    average: Optional[float] = None

    wickets: Optional[int] = None
    economy: Optional[float] = None

    class Settings:
        name = "players"