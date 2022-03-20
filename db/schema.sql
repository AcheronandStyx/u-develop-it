DROP TABLE IF EXISTS candidates; -- This will drop/delete the tables every time you run the schema.sql file, ensuring that you start with a clean slate.
DROP TABLE IF EXISTS parties; -- , the candidates table must be dropped before the parties table due to the foreign key constraint that requires the parties table to exist.


CREATE TABLE parties ( -- define a parties table to make this db relational
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

CREATE TABLE candidates ( -- Define the candidates table
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
  -- Above we use the constratin keyword to tel SAQL that part_id is a foreign key that references teh it field in the parties table 
  -- ON DELETE SET NULL to tell SQL to set a candidate's party_id field to NULL if the corresponding row in parties is ever deleted.
  -- Because this constraint relies on the parties table, the parties table MUST be defined first before the candidates table.
);

-- use ALTER TABLE to alter a table
-- ALTER TABLE candidates ADD COLUMN party_id INTEGER;

-- The AS keyword lets you define an alias for your data, which is particularly useful when joining tables that might have overlapping field names.
-- SELECT candidates.*, parties.name AS party_name

-- you can use dot notations to return only a certain column