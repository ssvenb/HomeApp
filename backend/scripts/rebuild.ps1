tsc
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi backend-app
docker-compose up
