Use MySQL, PostgreSQL and so on to work with geodata


```
CREATE DATABASE geo;
CREATE TABLE us_state (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  state INT,
  geo_json JSON NOT NULL
);

-- when db is filled with data
-- add column with special type and add index to it
ALTER TABLE us_state ADD COLUMN geo_binary GEOMETRY;
UPDATE us_state SET geo_binary=ST_GeomFromGeoJSON(geo_json);
ALTER TABLE us_state MODIFY geo_binary GEOMETRY NOT NULL;
ALTER TABLE us_state ADD SPATIAL INDEX(geo_binary);

-- try the same without index
ALTER TABLE us_state ADD COLUMN geo_no_index GEOMETRY;
UPDATE us_state SET geo_no_index=geo_binary;
```
