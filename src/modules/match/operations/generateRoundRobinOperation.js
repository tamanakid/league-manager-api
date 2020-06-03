const Table = require('@table/models/TableModel');
const Match = require('@match/models/MatchModel');

const { GLOBAL_DB_ERROR } = require('@/utils/globalResponses').resNames;




const matchGeneration = (teams, league) => {

	return new Promise((resolve, reject) => {

		const hub = teams[0];
		const nroTeams = teams.length
		const nroMatches = nroTeams * (nroTeams - 1);
		const nroMatchweeks = (nroTeams - 1) * 2;
		
		let matches = [];
		let responses = 0;
		let responseMatches = new Array(nroMatchweeks);
	
		for(var i = 0; i < (nroTeams/2); i++) {
			matches[i] = {
				team1: i,
				team2: (nroTeams - i - 1),
			};
		}
	
		for (let matchweek = 1; matchweek <= nroMatchweeks; matchweek++) {
			responseMatches[matchweek - 1] = new Array(nroTeams/2);
			let homeIsTeam1 = (matchweek % 2 !== 0);
	
			for (let matchIndex = 0; matchIndex < nroTeams/2; matchIndex++) {
				let homeTeam =  homeIsTeam1 ? teams[matches[matchIndex].team1] : teams[matches[matchIndex].team2];
				let awayTeam =  homeIsTeam1 ? teams[matches[matchIndex].team2] : teams[matches[matchIndex].team1];
				
				Match.create({
					league,
					matchweek,
					homeTeam,
					awayTeam,
				})
		
				.then((match) => {
					responseMatches[matchweek - 1][matchIndex] = {
						homeTeam: { id: match.homeTeam._id, name: match.homeTeam.teamName, abbr: match.homeTeam.teamAbbr },
						awayTeam: { id: match.awayTeam._id, name: match.awayTeam.teamName, abbr: match.awayTeam.teamAbbr },
					};

					responses++;
					if (responses === (nroTeams/2)*nroMatchweeks) {
						resolve(responseMatches);
					}
				})

				.catch((err) => {
					console.log("Error at match insertion:", err);
					reject();
				});
			}
	
	
			for(var i = 0; i < (nroTeams/2); i++) {
				matches[i] = {
					team1: (matches[i].team1 === 0) ? 0 : (matches[i].team1 === 1) ? 5 : (matches[i].team1 - 1),
					team2: (matches[i].team2 === 1) ? 5 : (matches[i].team2 - 1),
				}
			}
		}
	});

}




const generateRoundRobinOperation = (req, res, next) => {

	const league = res.locals.league;
	
	Table.findOne({ league }).then((table) => {
		if (!table) {
			next(TABLE_NOT_FOUND);
		} else {
			
			matchGeneration(table.teams, league)
			.then((responseMatches) => {
				res.status(200).json({
					leagueId: league._id,
					responseMatches,
				})
			})

			.catch(() => {
				next(GLOBAL_DB_ERROR);
			});
		}		
	
	
	})

	.catch(() => {
		next(GLOBAL_DB_ERROR);
	});

}



module.exports = generateRoundRobinOperation;