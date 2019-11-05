#### Pending sh script: Adding SSH identity when opening bash

```sh
eval $(ssh-agent -s)
ssh-add /route/to/ssh/folder
```