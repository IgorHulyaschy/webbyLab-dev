START TRANSACTION;
  ALTER TABLE films ADD CONSTRAINT unique_film UNIQUE (films_name)
COMMIT;