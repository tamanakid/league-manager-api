## League Module Endpoints


### POST `/league/create`

* Headers: Authorization
* request body: `name`, `location`, `numberOfTeams`
* response body: `leagueId`, `leagueName`


### POST `/league/:leagueId/add-team`

* Headers: Authorization
* request body: `teamId`
* response body: `teamId`, `leagueId`