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

  private static calculateTeamPoints(homeTeamGoals: number, awayTeamGoals: number): number {
    if (homeTeamGoals > awayTeamGoals) {
      return 3;
    } if (homeTeamGoals === awayTeamGoals) {
      return 1;
    }
    return 0;
  }

  private static calculateTotalGames(teamName: string, matches: IMatchTeams[]): number {
    return matches.filter((match) => match.homeTeam.teamName === teamName).length;
  }

  private static calculateTotalVictories(teamName: string, matches: IMatchTeams[]): number {
    return matches.filter((match) => match.homeTeam
      .teamName === teamName && match.homeTeamPoints === 3).length;
  }

  private static calculateTotalDraws(teamName: string, matches: IMatchTeams[]): number {
    return matches.filter((match) => match.homeTeam
      .teamName === teamName && match.homeTeamPoints === 1).length;
  }

  private static calculateTotalLosses(teamName: string, matches: IMatchTeams[]): number {
    return matches.filter((match) => match.homeTeam
      .teamName === teamName && match.homeTeamPoints === 0).length;
  }

  private static calculateGoalsFavor(teamName: string, matches: IMatchTeams[]): number {
    return matches.filter((match) => match.homeTeam.teamName === teamName)
      .reduce((acc, { homeTeamGoals }) => acc + homeTeamGoals, 0);
  }

  private static calculateGoalsOwn(teamName: string, matches: IMatchTeams[]): number {
    return matches.filter((match) => match.awayTeam.teamName === teamName)
      .reduce((acc, { homeTeamGoals }) => acc + homeTeamGoals, 0);
  }

  private static calculateGoalsBalance(goalsFavor: number, goalsOwn: number): number {
    return goalsFavor - goalsOwn;
  }

  private static calculateEfficiency(
    totalVictories: number,
    totalDraws: number,
    totalGames: number,
  ): number {
    return ((totalVictories * 3 + totalDraws) / (totalGames * 3)) * 100;
  }

  private static async calculateTeamStatistics(
    teamName: string,
    matches: IMatchTeams[],
  ): Promise<ILeaderboards> {
    const final = {
      name: teamName,
      totalPoints: 0,
    } as ILeaderboards;
    final.totalGames = LeaderboardModel.calculateTotalGames(teamName, matches);
    final.totalVictories = LeaderboardModel.calculateTotalVictories(teamName, matches);
    final.totalDraws = LeaderboardModel.calculateTotalDraws(teamName, matches);
    final.totalLosses = LeaderboardModel.calculateTotalLosses(teamName, matches);
    final.goalsFavor = LeaderboardModel.calculateGoalsFavor(teamName, matches);
    final.goalsOwn = LeaderboardModel.calculateGoalsOwn(teamName, matches);
    final.goalsBalance = LeaderboardModel.calculateGoalsBalance(final.goalsFavor, final.goalsOwn);
    final.efficiency = LeaderboardModel
      .calculateEfficiency(final.totalVictories, final.totalDraws, final.totalGames);

    return final;
  }

  private static async calculateLeaderboard(matches: IMatchTeams[]): Promise<ILeaderboards[]> {
    const teamNames = await LeaderboardModel.allTeamsNames();
    const teamStatisticsPromises = teamNames
      .map((teamName) => LeaderboardModel.calculateTeamStatistics(teamName, matches));
    const teamStatistics = await Promise.all(teamStatisticsPromises);
    return teamStatistics.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  public async getAllHostInfos(): Promise<ILeaderboards[]> {
    this.isOk = true;
    const matches = await LeaderboardModel.matchModel.findAllInProgress('false');
    const leaderboard = await LeaderboardModel.calculateLeaderboard(matches);
    return leaderboard;
  }
}
