from app.models.player_model import Player


# GET ALL PLAYERS
async def get_all_players():

    return await Player.find_all().to_list()


# GET SINGLE PLAYER BY ID
async def get_single_player(id: str):

    return await Player.get(id)


# GET PLAYERS BY COUNTRY
async def get_players_by_country(country: str):

    return await Player.find(
        Player.country == country
    ).to_list()


# CREATE PLAYER WITH AUTO ID
async def create_player(player_data):

    # Get all players who have a player_id
    players = await Player.find(
        Player.player_id != None
    ).to_list()

    # If players already exist, generate the next ID
    if players:

        last_player = players[-1]

        last_number = int(
            last_player.player_id.replace("PLY", "")
        )

        new_id = f"PLY{last_number + 1:03d}"

    # If no players exist, start from PLY001
    else:

        new_id = "PLY001"

    # Create the player object
    player = Player(
        player_id=new_id,
        **player_data.dict()
    )

    # Save to database
    await player.insert()

    return player


# UPDATE PLAYER BY ID
async def update_player(id: str, update_data):

    # Step 1: Find the player in the database
    player = await Player.get(id)

    # Step 2: Get only the fields that were sent (ignore None values)
    fields_to_update = update_data.dict(exclude_none=True)

    # Step 3: Update each field one by one
    for field, value in fields_to_update.items():
        setattr(player, field, value)

    # Step 4: Save the updated player to the database
    await player.save()

    return player


# DELETE PLAYER BY ID
async def delete_player(id: str):

    # Step 1: Find the player in the database
    player = await Player.get(id)

    # Step 2: Delete the player
    await player.delete()

    # Step 3: Return a success message
    return {"message": "Player deleted successfully"}