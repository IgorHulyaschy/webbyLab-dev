# How to start
```
npm i
```
## Then create file in root ".env" and insert data:
<ul>
    <li>PORT=3001</li> // If port would not be 3001, u must to change value in front-connection
    <li>DB_USER</li>
    <li>DB_HOST</li>
    <li>DB_NAME</li>
    <li>DB_PASS</li>
    <li>DB_PORT</li>
</ul>

## Then migrate tables to your local PostgreSQL database:

```
./migrations/up/1.Film.sql
./migrations/up/2.Actor.sql
./migrations/up/3.Film-Actor.sql
```
![Relations](https://github.com/IgorHulyaschy/webbyLab-dev/blob/master/db.jpg)

## Finally:

```
npm run serve
```