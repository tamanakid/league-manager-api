## Team Module Endpoints


### POST `/team/create`

* Headers: Authorization
* request body: `name`, `abbr`, `location`, `color1`, `color2`
* response body: `teamId`, `teamName`


### POST `/team/:teamId/add-player`

* Headers: Authorization
* request body: `name` (String), `shirtNumber` (Number), `position` (String)
* response body: `playerId`, [`leaguesId`]