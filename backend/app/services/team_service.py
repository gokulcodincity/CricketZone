from app.models.team_model import Team


async def get_all_teams():

    return await Team.find_all().to_list()