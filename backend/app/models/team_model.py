from beanie import Document


class Team(Document):

    name: str

    class Settings:
        name = "teams"