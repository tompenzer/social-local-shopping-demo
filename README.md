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
- [Docker](https://store.docker.com/search?offering=community&type=edition)

Clone the repo and start up the development environment using the terminal on
your local machine:
```
$ git clone git@github.com:tompenzer/wribbn.git
$ cd wribbn
$ docker-compose up
```
The first time you do this, you might want to go make yourself a beverage while
you wait for everything to get downloaded and compiled after that last command.


## Usage

You should see a contrast color message once the activity stream in the terminal
has settled down indicating "Express app started on port 4000", possibly
requiring you to scroll back up a bit to see it. This means the server is ready.

You should be able to access the site in your browser at the following address:

http://localhost:4000

Note that there is no data yet seeded. To run the seeds, adding 10 dummy users
and 10 stores, each with 10 products, run the following command:
```
$ docker-compose run --rm wribbn node seed.js
```
You should see some indication that the User and Store models have been seeded.
At this point, if you refresh the app, you should see a list of users. To exit
the seeding process and regain the command prompt in the terminal, you can enter
the `control-C` (`^C`) key combo.


## Clean-up

Once finished using the app, you can enter the following command to clean up the
environment:
```
$ docker-compose down --rmi all
```

To remove all not-currently-in-use built Docker images, run the following
command to clean up old images, subsequently entering `y` when prompted:
```
$ docker system prune -a
```

To clean up Docker's unused temp storage:
```
$ docker volume rm $(docker volume ls -qf dangling=true)
```
