## Match Module Endpoints


### PUT `/match/:matchId/play`

* Headers: Authorization
* query params: `homeApps`, `awayApps` (playerIds) - `homeGoalscorers`, `awayGoalscorers`: { `playerId`, `minute` }
* response body: (void)