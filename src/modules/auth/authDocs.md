## Auth Module Endpoints


### POST `/auth/signup`

* Headers: none
* request body: `username`, `password`, `email`, `name`
* response body: `userId`, `username`


### POST `/auth/login`

* Headers: none
* request body: `usernameOrEmail`, `password`
* response body: `userId`, `token`