export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

type teamName = number;

export interface IMatchTeams extends IMatch {
  homeTeam: teamName;
  awayTeam: teamName;
}

export interface IMatchFinish {
  message: string;
}

export interface IMatchInProgress {
  id: string;
  homeTeamGoals: string ;
  awayTeamGoals: string ;
}
