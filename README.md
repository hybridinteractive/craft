## About Aspen Recreation

AspenRecreation.com is a website resource for visitors and residents built on Craft CMS.

## Setting Up Local Dev

You'll need Docker desktop for your platform installed to run the project in local development

* Pull down or clone the repo
* Set up a `.env` file in the `cms/` directory, based off of the provided `example.env`
* Set up a `.env.sh.` file in the `scripts/` directory, based off of the provided `example.env.sh`
* Start up the site with `docker-compose up` or use the alias `up` if you use the aliases in your bash as mentioned below (the first build will be somewhat lengthy)
* Import the `seed_db.sql` database dump the first time from the `scripts/` dir with `./docker_restore_db.sh seed_db.sql`
* Navigate to `http://localhost:8000` to use the site; the `webpack-dev-server` runs off of `http://localhost:8080`
* It's also important to run `docker-compose exec php ./craft cli-craft setup/security-key` or `new-security-key` (from the `aliases` below) from within the `cms` directory to regenerate a new Craft CMS security key.

If you need to export your db from the container you can simply run docker exec craft-instrumental_mariadb_1 /usr/bin/If you need to export your db from the container you can simply run `docker exec REPLACEME_mariadb_1 /usr/bin/mysqldump -u project --password=project project > backup.sql` while your containers are running.

**Important:** To find the correct credentials for `LOCAL_DB_CONTAINER` run `docker-compose up` and once the docker container is running, use the command `docker container ls` to find the correct name of the container.
The project is called `REPLACEME` the container will be somewhere along the lines of `REPLACEME_mariadb_1` That's the value you do have to enter, you'll find it under the NAME column from the list.

**N.B.:** Without authorization & credentials (which are private), the `./docker_pull_db.sh` will not work. It's provided here for instructional purposes, keep in mind that this pull will only work on your local dev machine!

The CP login credentials are initially set as follows:

## Useful Docker Aliases

```
alias composer-install="docker-compose exec php composer install"
alias composer-update="docker-compose exec php composer update"
alias npm-update="docker-compose exec webpack npm update"
alias npm-install="docker-compose exec webpack npm install"
alias cli-craft="docker-compose exec php ./craft"
alias new-security-key="cli-craft setup/security-key"
alias project-sync="cli-craft project-config/apply"
alias index-assets="cli-craft index-assets/all"
alias pc-rebuild="cli-craft project-config/rebuild"
alias clear-caches="cli-craft clear-caches/all"
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

## Pulling the Sandbox Database into our Local Environment

Make sure all settings are set in `.env.sh` and run `./scripts/docker_pull_db.sh`

## Pulling the Production Database into our Sandbox Environment

-- NEED TO ADD --

## Updating Packages

To update to the latest Composer packages (as constrained by the `cms/composer.json` semvers), do the following in the project folder:

```
docker-compose exec php composer update

or 

composer-update
```

To update to the latest npm packages (as constrained by the `docker-config/webpack-dev-craft/package.json` semvers), do:
```
docker-compose exec webpack npm install

or 

npm-update
```

## Login information

To be able to login into the admin panel you'll need to have access to the right credentials which can be found here: UPDATE-BASECAMP-LINK-HERE

```
Login: hi@hybridinteractive.io
Password: letmein
```

## Running Craft CLI commands

Since we are using docker to run our project, we need to execute the craft CLI commands prepended with the docker command `docker-compose exec php`, eg: `docker-compose exec php ./craft project-config/sync`.

## Deploying

This project uses buddy.works to deploy to our sandbox and staging environments, this is an automated process, once buddy detects changes in the `sandbox` branch it will automatically deploy to our sandbox environment, when there are changes detected in the `production` branch it will automatically deploy to the production server.

Keep in mind that these deploys are atomic, they'll build inside of a releases folder and will be symlinked to current, which is being served to the end-user, this to ensure as little downtime as possible when releasing major changes.

---ADD BUDDY WORKS URL --

## Deleting docker images for a fresh start for this project

```
docker images -a | grep "REPLACEME" | awk '{print $3}' | xargs docker rmi -f
```

## XDebug

To use Xdebug with VSCode install the [PHP Debug extension](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug ) and use the following configuration:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for Xdebug",
            "type": "php",
            "request": "launch",
            "port": 9001,
            "log": true,
            "externalConsole": false,
            "pathMappings": {
                "/var/www/project/cms": "${workspaceRoot}/cms"
            },
            "ignore": ["**/vendor/**/*.php"]
        }
    ]
}
```