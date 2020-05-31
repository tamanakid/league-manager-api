## Auth Module Endpoints


### `/auth/signup`

* Headers: none
* request body: `username`, `password`, `email`, `name`
* response body: `userId`, `username`


### `/auth/login`

* Headers: none
* request body: `usernameOrEmail`, `password`
* response body: `userId`, `token`