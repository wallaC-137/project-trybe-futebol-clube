import MatchesModel from "../../../database/models/SequelizeMatches";
// import SequelizeTeams from "../../database/models/SequelizeTeams";

// const homeTeam = SequelizeTeams.build({
//   teamName: 'São Paulo'
// });
// const awayTeam = SequelizeTeams.build({
//   teamName: 'Grêmio'
// });

const finAllMatches = [
  MatchesModel.build({
    id: 1,
    homeTeamId: '16',
    homeTeamGoals: '1',
    awayTeamId: '8',
    awayTeamGoals: '1',
    inProgress: false,
  })
];

export default {
  finAllMatches,
}


