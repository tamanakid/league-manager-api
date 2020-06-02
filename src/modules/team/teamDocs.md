## Team Module Endpoints


### `/team/create`

* Headers: Authorization
* request body: `name`, `location`, `color1`, `color2`
* response body: `teamId`, `teamName`


### `/team/:teamId/add-player`

* Headers: Authorization
* request body: `name`, `shirtNumber`,
* response body: `playerId`, [`leagueId`]