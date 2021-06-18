START TRANSACTION;
  create table film_actor(
    id serial PRIMARY KEY ,
    id_film int,
    id_actor int
  );
ALTER TABLE "film_actor" ADD CONSTRAINT fk_actor FOREIGN KEY (id_actor) REFERENCES actors(id)
ALTER TABLE "film_actor" ADD CONSTRAINT fk_film FOREIGN KEY (id_film) REFERENCES films(id)

COMMIT;