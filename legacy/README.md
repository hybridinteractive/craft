# Craft CMS with Laravel Mix #

This is a Craft 2 project with Laravel Mix for the build process.


## Getting Started ##

* Prerequisites 
* Installing
* Deployment


### Prerequisites

You should have a local server running with all the Craft server requirements.

See https://docs.craftcms.com/v2/requirements.html#required-php-extensions.

Valet is a great out of the box option that has all needed requirements for the local development server.
See https://laravel.com/docs/6.x/valet for info on installing it.


Check for Node and NPM

```
node -v && npm -v
```

### Installing

First clone this repo into your local server directory


* Set the web root to the content folder or if valet use valet link
* Navigate to the local config folder /craft/config/local
* Duplicate db.example.php and rename to db.php (the default db configuration in the local example will connect remotely to the development database. You may change these credentials to point to a local database for development.)
* Duplicate general.example.php and rename to general.php

```
git clone git@access-fund.git.beanstalkapp.com:/access-fund/website-updated.git
```

Install all node packages.

```
npm install
```


## Deployment
All deploys should have the relevant code checked into git and all local files up to date. Log into https://access-fund.beanstalkapp.com/ to run the deploy.


## Laravel Mix Development Commands

Will compile all sass/js and other files listed for production

```
npm run prod
```

Will launch BrowserSync and HMR server that are set to watch/build tasks on files

```
npm run hot
```

For other commands see package.json in the scripts section.

## Check out front end

Now point your browser at `http://accessfund.test`. You should see the homepage.

## Logging in

The Craft Control Panel is located at `http://accessfund.test/admin`. You can log in with the following credentials:

* Username: rabbleadmin
* Password: c0wbell!123


## Built With

* [Craft CMS](https://craftcms.com/) - Craft is the CMS that makes the whole team happy.
* [Laravel Mix](https://laravel.com/docs/6.0/mix) - A fluent API for defining Webpack build steps for your project using several common CSS and JavaScript pre-processors. 

## Notes
* Shopify site files: content/stylesheets
* Impact Map site files: content/external
* Our Impact 2016 and 2017 source files are in content/reports


## To Do

* Fix up twigpack to make sure its working right and add to base template. 10min
* Add cloudflare plugin and configure it. 10min
* update to craft 3.4 1hr
* add the redirects back from old plugin into the sprout plugin. 30min
* adjust images to have a background position drop down to replace old plugin one in the templates 1hr
* go through templates to remove old plugins calls, adjust to craft 3 and remove deprecation issues. 4hr
* install solspace calendar in place of AF plugin and configure in various templates 2hrs (may be more depending on style need)
* review routes for news-and-events and download assets 10min
* install craft contact form/extentsions to replace form and captcha or setup freeform 2hrs 
* adjust images to use native focal point 30min
* general cleanup from craft2 to 3 and content dir from moving to S3 ?



