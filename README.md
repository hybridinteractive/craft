https://app.buddy.works/instrumental/instrumental-com-craft


## Docker Aliases

```
alias composer-install="docker-compose exec php composer install"
alias composer-update="docker-compose exec php composer update"
alias npm-update="docker-compose exec webpack npm update"
alias npm-install="docker-compose exec webpack npm install"
alias project-sync="docker-compose exec php ./craft project-config/apply"
alias index-assets="docker-compose exec php ./craft index-assets/all"
alias pc-rebuild="docker-compose exec php ./craft project-config/rebuild"
alias clear-caches="docker-compose exec php ./craft clear-caches/all"
alias sync-db="./scripts/docker_pull_db.sh"
alias up="docker-compose up"
alias restart="docker-compose restart"
alias down="docker-compose down"
alias nuke="docker stop $(docker ps -qa); docker rm $(docker ps -qa); docker rmi -f $(docker images -qa); docker volume rm $(docker volume ls -q); docker network rm $(docker network ls -q)"
alias remove-network="docker network rm $(docker network ls -q)"
alias remove-volumes="docker volume rm $(docker volume ls -q)"
alias stop="docker stop $(docker ps -qa)"
alias remove-images="docker rmi -f $(docker images -qa)"
alias remove-orphans="docker-compose up --remove-orphans"
```

If you need to export your db from the container you can simply run `docker exec craft-accessfund_mariadb_1 /usr/bin/mysqldump -u project --password=project project > seed_db.sql` while your containers are running.
