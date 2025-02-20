from fastapi import FastAPI, Request, HTTPException
from redis import Redis
import time

app = FastAPI()
redis_client = Redis(host="localhost", port=6379, decode_responses=True)

RATE_LIMIT = 5  # Max requests
TIME_WINDOW = 60  # In seconds

@app.get("/")
async def root(request: Request):
    client_ip = request.client.host
    key = f"rate_limit:{client_ip}"

    request_count = redis_client.get(key)
    if request_count is None:
        redis_client.setex(key, TIME_WINDOW, 1)
    else:
        request_count = int(request_count)
        if request_count >= RATE_LIMIT:
            raise HTTPException(status_code=429, detail="Too many requests")
        redis_client.incr(key)

    return {"message": "Hello, World!"}

## uvicorn main:app --reload