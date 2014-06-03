# Node ORM roundup
A roundup of different Node.js ORM libraries for modelling a particular Postgres use case

## Use case
```
CREATE EXTENSION "uuid-ossp";
CREATE TABLE users
("id" UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
 "email" TEXT,
 "created_at" TIMESTAMP DEFAULT NOW(),
 "updated_at" TIMESTAMP DEFAULT NOW()
);
CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS '
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';
CREATE TRIGGER update_updated_at_trigger BEFORE UPDATE
  ON users FOR EACH ROW EXECUTE PROCEDURE
  update_updated_at_column();
INSERT INTO users ("email") VALUES ('test@example.com');
UPDATE users set "email"='test2@example.com';
SELECT * FROM users;
```
Should result in something like this (with other timestamps)
```
                  id                  |       email       |         created_at         |         updated_at
--------------------------------------+-------------------+----------------------------+----------------------------
 a33a6dd7-6526-419b-b1d0-9ff124ebf6b1 | test2@example.com | 2014-06-02 15:58:46.294779 | 2014-06-02 15:58:46.296067
(1 row)
```
