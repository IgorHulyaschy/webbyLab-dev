START TRANSACTION;
  create table films(
    id serial PRIMARY KEY ,
    films_name varchar NOT NULL ,
    date_of_release varchar NOT NULL ,
    format varchar NOT NULL 
  );
COMMIT;