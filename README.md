# Wribbn Backend Demo
A simple MongoDB/Mongoose/Express app for Wribbn's backend challenge.

Inspiration:
https://github.com/madhums/node-express-mongoose-demo
https://github.com/andrejewski/fakegoose

## Installation

Development environment requirements:
- [Git](https://git-scm.com/) - on Mac, you will be prompted to install the CLI
dev tools including `git` upon attempting to `git clone` in the command below if
you don't already have it installed.
- [Docker](https://store.docker.com/search?offering=community&type=edition) - On
Mac, you can download the installer [directly](https://download.docker.com/mac/stable/Docker.dmg).

Clone the repo and start up the development environment using the terminal on
your local machine:
```
$ git clone git@github.com:tompenzer/wribbn.git
$ cd wribbn
$ docker-compose run --rm wribbn yarn install
$ docker-compose up
```
The first time you do this, you might want to go make yourself a beverage while
you wait for everything to get downloaded and compiled after the `yarn install`
command.


## Usage

You should see a contrast color message once the activity stream in the terminal
has settled down indicating "Express app started on port 4000", possibly
requiring you to scroll back up a bit to see it. This means the server is ready.

You should be able to access the site in your browser at the following address:

http://localhost:4000

Note that there is no data yet seeded. To run the seeds, adding 10 dummy users
and 10 stores, each with 10 products, run the following command (you can open a
new terminal tab or window to avoid disturbing the node server.js process;
interrupting that will stop the app):
```
$ docker-compose run --rm wribbn node seed.js
```
You should see some indication that the User and Store models have been seeded.
At this point, if you refresh the app, you should see a list of users. To exit
the seeding process and regain the command prompt in the terminal, you can enter
the `control-C` (`^C`) key combo.


## Shutdown

To stop the app gracefully, you can enter `control-C` (`^C`) on the main node
server.js process, or open a new terminal tab, and enter the following command:
```
$ docker-compose stop
```
Then, the app should spin up quickly when you enter `docker-composer start`.

## Clean-up

Once finished using the app for good, you can enter the following command to
clean up the environment and images:
```
$ docker-compose down --rmi all
```

To remove all not-currently-in-use built Docker images, run the following
command to purge all images, subsequently entering `y` when prompted:
```
$ docker system prune -a
```

To clean up all of Docker's unused temp storage:
```
$ docker volume rm $(docker volume ls -qf dangling=true)
```
