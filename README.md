# 🍷 Traits_Tastes 🍷

## * Icon


![Traits   Tastes (300 x 80 px)](https://github.com/jb69535/Traits_Tastes/assets/92282867/8ab5b0cd-4bfd-44fd-bc7f-4723fe97d530)

![Traits   Tastes](https://github.com/jb69535/Traits_Tastes/assets/92282867/338d857f-2964-4b90-ab31-3d9b072846b1)

## * Members
  💻 Jun Beom <br>Team Leader, Contributed on Frontend, Backend, and Database <br> 
  💻 Brandon Czech <br>Contributed on Database, Demo Video <br> 
  💻 Wonjoon Hwang <br>Contributed on Database, Project Report<br> 

## * Available Scripts

In the project directory, you can run:

"scripts": { \
&emsp; "install:client": "cd client && npm install",\
&emsp; "install:server": "cd server && npm install",\
&emsp; "build:client": "cd client && npm run build",\
&emsp; "build:server": "cd server && npm run build",\
&emsp; "start:server": "cd server && npm start",\
&emsp; "start:client": "cd client && npm start",\
&emsp; "start": "npm run build:client && npm run start:server",\
&emsp; "deploy": "npm run build:client && npm run build:server && npm run start:server"\
    }

Runs the app in the development mode.\
The page will reload if you make edits.

## * Use provided database termproject.sql to import into your server.

Un-zip the termproject.sql zip file

From the terminal, 
do 
```sql
mysql -u username -p < termproject.sql
```
The username should be replaced with the actual username of the MySQL user who has the necessary permissions to import databases, \
and termproject.sql should be the actual path to the SQL dump file that you want to import.








