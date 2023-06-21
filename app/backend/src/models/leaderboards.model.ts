import { IMatchTeams } from '../Interfaces/matches/IMetch';
import TeamsModel from './teams.model';
import MatchModel from './matches.model';
import { ILeaderboards } from '../Interfaces/Leaderboards/ILeaderboards';
import { ILeaderboardsModel } from '../Interfaces/Leaderboards/ILeaderboardsModel';

export default class LeaderboardModel implements ILeaderboardsModel {
  private static matchModel = new MatchModel();
  private static teamsModel = new TeamsModel();
  private isOk = false;

  private static async allTeamsNames() {
    const names = await LeaderboardModel.teamsModel.findAll();
    return names.map(({ teamName }) => teamName);
  }

  private static async winResult() {
    const dbData = await LeaderboardModel.matchModel.findAllInProgress('false');
    // console.log(dbData);

    const w = dbData.map(({ homeTeamGoals, awayTeamGoals, homeTeam, homeTeamId }) => {
      let homeTeamPoints = 0;
      // let awayTeamPoints = 0;

      if (homeTeamGoals > awayTeamGoals) {
        homeTeamPoints = 3;
      } else if (homeTeamGoals < awayTeamGoals) { homeTeamPoints = 0; } else { homeTeamPoints = 1; }

      // if (awayTeamGoals > homeTeamGoals) {
      //   awayTeamPoints = 3;
      // } else if (awayTeamGoals < homeTeamGoals) { awayTeamPoints = 0; } else { awayTeamPoints = 1; }

      return {
        name: homeTeam.teamName,
        homeTeamPoints,
        homeTeamId,
        // awayTeamPoints,
      };
    });
    return w;
  }

  private static async calculateTeamPoints(teamName: string): Promise<number> {
    const teamsPoints = await LeaderboardModel.winResult();
    let points = 0;
    teamsPoints.forEach(({ name, homeTeamPoints }) => {
      if (name === teamName) {
        points += homeTeamPoints;
      }
    });
    return points;
  }

  // private static calculateTeamPoints(homeTeamGoals: number, awayTeamGoals: number): number {
  //   if (homeTeamGoals > awayTeamGoals) {
  //     return 3;
  //   } if (homeTeamGoals === awayTeamGoals) {
  //     return 1;
  //   }
  //   return 0;
  // }

  private static calculateTotalGames(teamName: string, matches: IMatchTeams[]): number {
    return matches.filter((match) => match.homeTeam.teamName === teamName).length;
  }

  // private static calculateTotalVictories(teamName: string, matches: IMatchTeams[]): number {
  //   return matches.filter((match) => match
  //     .teamName === teamName && match.homeTeamPoints === 3).length;
  // }

  private static async calculateTotalVictories(teamName: string): Promise<number> {
    const teamsPoints = await LeaderboardModel.winResult();
    return teamsPoints.filter(({ name, homeTeamPoints }) => name === teamName
      && homeTeamPoints === 3).length;
  }

  // private static calculateTotalDraws(teamName: string, matches: IMatchTeams[]): number {
  //   return matches.filter((match) => match.homeTeam
  //     .teamName === teamName && match.homeTeamPoints === 1).length;
  // }

  private static async calculateTotalDraws(teamName: string): Promise<number> {
    const teamsPoints = await LeaderboardModel.winResult();
    return teamsPoints.filter(({ name, homeTeamPoints }) => name === teamName
      && homeTeamPoints === 1).length;
  }

  // private static calculateTotalLosses(teamName: string, matches: IMatchTeams[]): number {
  //   return matches.filter((match) => match.homeTeam
  //     .teamName === teamName && match.homeTeamPoints === 0).length;
  // }

  private static async calculateTotalLosses(teamName: string): Promise<number> {
    const teamsPoints = await LeaderboardModel.winResult();
    return teamsPoints.filter(({ name, homeTeamPoints }) => name === teamName
      && homeTeamPoints === 0).length;
  }

  private static calculateGoalsFavor(teamName: string, matches: IMatchTeams[]): number {
    return matches.filter((match) => match.homeTeam.teamName === teamName)
      .reduce((acc, { homeTeamGoals }) => acc + homeTeamGoals, 0);
  }

  private static calculateGoalsOwn(teamName: string, matches: IMatchTeams[]): number {
    return matches.filter((match) => match.homeTeam.teamName === teamName)
      .reduce((acc, { awayTeamGoals }) => acc + awayTeamGoals, 0);
  }

  private static calculateGoalsBalance(goalsFavor: number, goalsOwn: number): number {
    return goalsFavor - goalsOwn;
  }

  private static calculateEfficiency(
    totalVictories: number,
    totalDraws: number,
    totalGames: number,
  ): string {
    return (((totalVictories * 3 + totalDraws) / (
      totalGames * 3)) * 100).toFixed(2);
  }

  private static async calculateTeamStatistics(
    teamName: string,
    matches: IMatchTeams[],
  ): Promise<ILeaderboards> {
    const final = {
      name: teamName,
      totalPoints: 0,
    } as ILeaderboards;
    // const teamsPoints = await LeaderboardModel.winResult();
    final.totalPoints = await LeaderboardModel.calculateTeamPoints(teamName);
    final.totalGames = LeaderboardModel.calculateTotalGames(teamName, matches);
    final.totalVictories = await LeaderboardModel.calculateTotalVictories(teamName);
    final.totalDraws = await LeaderboardModel.calculateTotalDraws(teamName);
    final.totalLosses = await LeaderboardModel.calculateTotalLosses(teamName);
    final.goalsFavor = LeaderboardModel.calculateGoalsFavor(teamName, matches);
    final.goalsOwn = LeaderboardModel.calculateGoalsOwn(teamName, matches);
    final.goalsBalance = LeaderboardModel.calculateGoalsBalance(final.goalsFavor, final.goalsOwn);
    final.efficiency = LeaderboardModel
      .calculateEfficiency(final.totalVictories, final.totalDraws, final.totalGames);

    return final;
  }

  private static async calculateLeaderboard(matches: IMatchTeams[]): Promise<ILeaderboards[]> {
    const teamNames = await LeaderboardModel.allTeamsNames();
    const teamStatisticsPromises = teamNames.map((teamName) => LeaderboardModel
      .calculateTeamStatistics(teamName, matches));
    const teamStatistics = await Promise.all(teamStatisticsPromises);

    teamStatistics.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });

    return teamStatistics;
  }

  public async getAllHostInfos(): Promise<ILeaderboards[]> {
    this.isOk = true;

    const matches = await LeaderboardModel.matchModel.findAllInProgress('false');
    const leaderboard = await LeaderboardModel.calculateLeaderboard(matches);

    return leaderboard as unknown as [];
  }
}
