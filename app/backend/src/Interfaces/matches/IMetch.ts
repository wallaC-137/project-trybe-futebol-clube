export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

type teamName = string;

export interface IMatchTeams extends IMatch {
  homeTeam: teamName;
  awayTeam: teamName;
}

export interface IMatchFinish {
  message: string;
}
