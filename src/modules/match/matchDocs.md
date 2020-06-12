## Match Module Endpoints


### PUT `/match/:matchId/play`

* Headers: Authorization (League Admin)
* query params: `homeApps`, `awayApps` (playerIds) - `homeGoalscorers`, `awayGoalscorers`: { `playerId`, `minute` }
* response body: (void)


### GET `/match/:matchId/get-info`

* Headers: none
* query params: none
* response body: match (from model)