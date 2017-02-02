Use MySQL, PostgreSQL and so on to work with geodata


```
CREATE DATABASE geo;
CREATE TABLE us_state (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  state INT,
  geometry JSON NOT NULL
  );
```
