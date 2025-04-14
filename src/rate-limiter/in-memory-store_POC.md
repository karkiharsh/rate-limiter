### THIS IS POC ONLY

redis-cli ping

============================

##### using sets

write into redis:
redis-cli SADD my_set "1"
redis-cli SADD my_set "2"
redis-cli SADD my_set "3"

redis-cli SADD favorite_fruits "apple" "banana" "orange" "mango"

read from redis:
SMEMBERS my_set // get all values

we won't use sets because if timestamps are same it will store 1 value only .

============================

##### use lists

write into redis :

redis-cli RPUSH my_ordered_data 1
redis-cli RPUSH my_ordered_data 3
redis-cli RPUSH my_ordered_data 5
redis-cli RPUSH my_ordered_data 7
redis-cli RPUSH my_ordered_data 9

read :

redis-cli LRANGE my_ordered_data 0 -1 # To verify the list

Apply your filter (e.g., values >= 5).

redis-cli LPOP my_ordered_data # Pop the first element
redis-cli LPOP my_ordered_data # Pop the second element

redis-cli LRANGE my_ordered_data 0 -1 # Verify the list after popping

redis-cli RPUSH my_ordered_data 11
redis-cli LRANGE my_ordered_data 0 -1 # Verify the list after pushing

============================
