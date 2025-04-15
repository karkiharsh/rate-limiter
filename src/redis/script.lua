-- This is an ATOMIC script to increment a key and set an expiration time if it is the first increment.
EVAL "local current = redis.call('INCR', KEYS[1]) if current == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end return current" 1 hits:harsh 60
