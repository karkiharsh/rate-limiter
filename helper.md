#### redis setup using docker

### docker run --name redis -d -p 6379:6379 redis

runs redis in a container

### docker ps , docker logs redis

both commands are to verify if redis is running

### docker exec -it redis redis-cli

connect to your redis

### PING

PONG

---

#### managing deps.

pip install fastapi uvicorn redis
uvicorn rate-limiter-mvp:app --reload |rate-limiter-mvp is file's name

---

#### bash

## to make this file executable | chmod +x test.sh

## run it with | ./test.sh

---

#### Git

git push --tags
