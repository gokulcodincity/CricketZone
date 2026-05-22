from app.models.player_model import Player


async def get_all_players():

    return await Player.find_all().to_list()


async def get_single_player(id: str):

    return await Player.get(id)


async def get_players_by_country(country: str):

    return await Player.find(
        Player.country == country
    ).to_list()


async def create_player(player_data):

    player = Player(**player_data.dict())

    await player.insert()

    return player