START TRANSACTION;
  create table actors(
    id serial PRIMARY KEY ,
    fname varchar NOT NULL ,
    lname varchar NOT NULL 
  );
COMMIT;