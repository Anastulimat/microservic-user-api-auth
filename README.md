# Docker

## Build docker 
>docker build -t auth-jwt .

## Run docker container (Attached mode)
>docker run -it -p 5000:5000 auth-jwt

## Run docker container (detached mode)
>docker run -d -p 5000:5000 auth-jwt


# Test

## Check if API works
>http://localhost:5000/api


## Check if database connection works by retrieving data
>http://localhost:5000/api/user


