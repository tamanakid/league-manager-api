## League Module Endpoints


### POST `/league/create`

* Headers: Authorization
* request body: `name`, `location`, `numberOfTeams`
* response body: `leagueId`, `leagueName`


### POST `/league/:leagueId/add-team`

* Headers: Authorization
* request body: `teamId`
* response body: `teamId`, `leagueId`


### PUT `/league/:leagueId/edit-matches-info`

* Headers: none
* request body: [`matches`: {`id`, `venue`, `date`}]
* response body: [`matchesModified`], [`matchesFailed`]


### GET `/league/:leagueId/get-matches`

* Headers: none
* query params: `next` or `last`
* response body: `leagueId`, [`match`]