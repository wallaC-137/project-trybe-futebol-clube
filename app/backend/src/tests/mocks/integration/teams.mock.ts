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

const allTeamsNoBuild = [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
]

export default {
  allTeams,
  allTeamsNoBuild
}