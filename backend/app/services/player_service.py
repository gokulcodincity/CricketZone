from app.models.player_model import Player


# GET ALL PLAYERS
async def get_all_players():

    return await Player.find_all().to_list()


# GET SINGLE PLAYER
async def get_single_player(id: str):

    return await Player.get(id)


# GET PLAYERS BY COUNTRY
async def get_players_by_country(country: str):

    return await Player.find(
        Player.country == country
    ).to_list()


# CREATE PLAYER WITH AUTO ID
async def create_player(player_data):

    # get all players with player_id
    players = await Player.find(
        Player.player_id != None
    ).to_list()

    # if players exist
    if players:

        last_player = players[-1]

        last_number = int(
            last_player.player_id.replace("PLY", "")
        )

        new_id = f"PLY{last_number + 1:03d}"

    # first player
    else:

        new_id = "PLY001"

    # create player
    player = Player(
        player_id=new_id,
        **player_data.dict()
    )

    # insert into database
    await player.insert()

    return player