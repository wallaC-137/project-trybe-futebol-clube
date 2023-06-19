import model from '../../../database/models/SequelizeTeams'

const allTeams = [
  model.build(
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    }
  ),
  model.build(
    {
      "id": 2,
      "teamName": "Bahia"
    }
  ),
  model.build(
    {
      "id": 3,
      "teamName": "Botafogo"
    }
  ),
]

const teamById = {
  "id": 1,
  "teamName": "Avaí/Kindermann"
}

const teamByIdModel = model.build(teamById)

const teamByIdNotFound = { message: `Team 20 not found` }

export default {
  allTeams,
  teamByIdModel,
  teamById,
  teamByIdNotFound
}