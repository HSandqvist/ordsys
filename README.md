# OrdSys

OrdSys is a web application designed to create, display, and manage order tickets for use in the kitchen and bar during
various events held by the Uppsala Union of Engineering and Science Students. It is written in Python3 and Javascript 
using Django and PostgreSQL for the backend and React & Bootstrap for the frontend. 

![OrdSys Front Page](https://user-images.githubusercontent.com/55285451/222741000-bef088f4-3945-4cb6-8c42-3000a8af3b11.png)


## Requirements

The application requires Python (version 3.8 or greater), Node.js (Version 16 or greater) by using [nvm](https://github.com/nvm-sh/nvm).

## Installation

To begin, clone the repo and open the repository folder in your terminal.

### Backend

#### Install redis

On ubuntu, follow step 1 of this guide: [https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-22-04](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-22-04)

On mac run `brew install redis`

#### Creating a Python Virtual Environment

##### MacOS/Linux

1. Run the command `source source_me.sh` to create and enter the virtual environment.
2. Update pip to the latest version `pip install --upgrade pip`.
3. Install the required Python dependencies with `pip install -r dev-requirements.txt`.

##### Windows

1. Make sure you have the `virtualenv` and `virtualenvwrapper-win` packages installed on your system.
If you don't, install them using `$ pip install virtualenv` or `$ pip install virtualenvwrapper-win`.
2. Create a new virtual environment with `$ mkvirtualenv venv`. This will create a virtual environment called `venv` 
and automatically enter it.
3. Install the required Python dependencies with `(venv) $ pip install -r dev-requirements.txt`.
If the versions are mis-matched, you may have to install each package of `dev-requirements.txt` manually.

### Setting up the database

0. Make sure you are running the redis server, on mac run: redis-server  

1. Create all required database tables, enter `./manage.py migrate`.
2. Create an organisation to associate your users with by running `./manage.py createorganisation`.
3. Create a superuser so that you can log in with `./manage.py createsuperuser`.

#### Running the backend

1. Make sure you're in your virtual environment. If not, enter it using `source source_me.sh`
2. Start the server by typing `./manage.py runserver`.

The backend can now be accessed at http://localhost:8000/.

### Frontend

1. `cd` to `frontend/`
2. Install the required dependencies using `$ yarn install`.
3. Run the frontend using `$ yarn start`. It should automatically open in your web browser. If not,
you can open your web browser and browse to http://localhost:3000/.

__Note__: Running the frontend with `start` launches it in development mode. To build and deploy to a production
environment, use `$ yarn build`, and follow the appropriate steps at the
[official guide](https://create-react-app.dev/docs/deployment/).

## Docker

For this repository there also exists a compose file meant to ease the setup of a development environment.

### Requirements
1. You need to install [Docker Engine](https://docs.docker.com/engine/install/)
2. You need to install [Docker Compose](https://docs.docker.com/compose/install/)
- Alternatively, on Ubuntu you should just need to install `docker.io` by runnning `sudo apt install docker.io`

### Usage

To start using the compose file run the shell script `run-dev.sh` with sudo supplying the flag `init` incase you want to create a superuser and a new organisation.
> Examples
```bash
sudo ./run-dev.sh init # prompts you for details to create user and org
sudo ./run-dev.sh # starts everything without prompting
```

### Stopping the development environment

To stop the development environment run `docker compose down`
