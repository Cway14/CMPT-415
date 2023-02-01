# Boilerplate
This repo will be our base line for cmpt 415

## Requirements
[Node.js](https://nodejs.org/en/)  <br />
[Docker](https://docs.docker.com/get-docker/)  <br />
[Database Client (VScode Extention)](https://github.com/user/repo/blob/branch/other_file.md)  <br />

## Installation
After installing all the required tools Clone this repo

```
git clone https://github.com/kiajalali/CMPT-415
```

```
cd CMPT-415/server
```

Once you're in the boilerplate directory make sure Docker Engine is running to ensure that docker is running run the following command
```
docker ps
```

After that rename `EXAMPLE.env` to `.env` <br />
the env file should look something like the following (DO NOT CHANGE THESE VALUES)
```
PGUSER=root
PGHOST=127.0.0.1
PGPASSWORD=root
PGDATABASE=orange
PGPORT=5432
```

Finally to setup our database simply run the following command
```
docker-compose up -d
```

Once you've done that you can connect to the database using the [Database Client (VScode Extention)](https://github.com/user/repo/blob/branch/other_file.md)
The default username and password is `root` <br />
<br />
![image](https://user-images.githubusercontent.com/72360378/153683971-5045bb2c-ee71-427b-9f0c-c44ea34c9aa9.png)

curl -i -H "Content-Type: application/json" -X POST -d '{
    "emai": "test@gmail.com",
    "username": "test",
    "password": "test"
    }' localhost:5000/signup
