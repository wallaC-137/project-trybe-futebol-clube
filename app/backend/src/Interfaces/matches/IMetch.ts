export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

type teamName = { teamName: string }; // assim é para passar no requisito 23

// type teamName = number; assim era antes
// type teamName = string; assim é como deveria ser

export interface IMatchTeams extends IMatch {
  homeTeam: teamName;
  awayTeam: teamName;
  homeTeamPoints?: number;
}

export interface IMatchFinish {
  message: string;
}

export interface IMatchInProgress {
  id: string;
  homeTeamGoals: string ;
  awayTeamGoals: string ;
}

export interface IMatchCreate {
  homeTeamId: string;
  awayTeamId: string;
  homeTeamGoals: string;
  awayTeamGoals: string;
}
