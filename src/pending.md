# Pending endpoints


&nbsp;
## Table Module

1. Table Module creation
2. Operation: Create Table (From create league endpoint)
3. Operation: Add league to table (From add team to league endpoint)


&nbsp;
## Match Module

1. Generate Round Robin (Scheduling Algorithm)
2. Play Match - must recalculate table
3. Edit match information (before match)
4. Edit match results (after match) - must re-calculate table


&nbsp;
## Team Module


### GET `/team/:teamId/shirt-number-availability/:shirtNumber`

* Headers: Authorization (only team admin)
* response body: `teamId`, `isAvailable`


### PUT `/team/:teamId/edit-player/:playerId`

* Headers: Authorization (only team admin)
* request body: `name` (String), `shirtNumber` (Number), `position` (String)
* response body: `playerId`, [`leaguesId`]


### DELETE `/team/:teamId/delete-player/:playerId`

* Headers: Authorization (only team admin)
* response body: `teamId`, `playerId`


### GET `/team/:teamId`

* Headers: None
* response body:
  * `teamId`, `name`, `location`, `color1`, `color2`
  * [`leagueId`, `leagueName`]