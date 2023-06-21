export interface ILeaderboards {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

// type teamName = number;

// export interface IMatchTeams extends IMatch {
//   homeTeam: teamName;
//   awayTeam: teamName;
// }

// export interface IMatchFinish {
//   message: string;
// }

// export interface IMatchInProgress {
//   id: string;
//   homeTeamGoals: string ;
//   awayTeamGoals: string ;
// }

// export interface IMatchCreate {
//   homeTeamId: string;
//   awayTeamId: string;
//   homeTeamGoals: string;
//   awayTeamGoals: string;
// }
