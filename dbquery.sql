CREATE DATABASE manzildb;

SELECT user, host, plugin FROM mysql.user WHERE user = 'root';


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Avinash0632@';


FLUSH PRIVILEGES;
 
 
 SELECT * FROM manzildb.files;