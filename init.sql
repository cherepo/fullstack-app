-- CREATE USER docker;

-- CREATE DATABASE docker
--   WITH OWNER = docker
--        ENCODING = 'UTF8'
--        TABLESPACE = pg_default
--        CONNECTION LIMIT = -1;

GRANT ALL PRIVILEGES ON DATABASE docker TO docker;

CREATE TABLE ADDRESS
(
ID    INT primary key
,isBilling  boolean
,createdDate  date
,prefix varchar(100)
,streetNumber varchar(20)
,streetName  varchar(200)
,suburb  varchar(50)
,city varchar(50)
,country varchar(50)
,postcode INT
,clientId INT
);
create index ID_ADDRESS_IDX on ADDRESS using btree(ID asc);

INSERT INTO ADDRESS (ID, isBilling, createdDate, prefix, streetNumber, streetName, suburb, city, country, postcode, clientId)
VALUES
   (1, false, to_date('2019-10-01', 'YYYY-MM-DD'), '', '200', 'Adelaide Street', 'Brisbane', 'Brisbane', 'Australia', 4000, 1);

INSERT INTO ADDRESS (ID, isBilling, createdDate, prefix, streetNumber, streetName, suburb, city, country, postcode, clientId)
VALUES
   (2, false, to_date('2019-02-12', 'YYYY-MM-DD'), '', '160', 'Wickham terrace', 'Sprin Hill', 'Brisbane', 'Australia', 4006, 2);

INSERT INTO ADDRESS (ID, isBilling, createdDate, prefix, streetNumber, streetName, suburb, city, country, postcode, clientId)
VALUES
   (3, false, to_date('2019-05-21', 'YYYY-MM-DD'), '', '140', 'Pembrook Road', 'Cooparoo', 'Brisbane', 'Australia', 4012, 3);

INSERT INTO ADDRESS (ID, isBilling, createdDate, prefix, streetNumber, streetName, suburb, city, country, postcode, clientId)
VALUES
   (4, false, to_date('2019-04-07', 'YYYY-MM-DD'), '', '12', 'Readon Street', 'Calamvale', 'Brisbane', 'Australia', 4116, 2);

INSERT INTO ADDRESS (ID, isBilling, createdDate, prefix, streetNumber, streetName, suburb, city, country, postcode, clientId)
VALUES
   (5, false, to_date('2019-11-16', 'YYYY-MM-DD'), '', '26', 'Laminton Street', 'Herston', 'Brisbane', 'Australia', 4006, 1);

INSERT INTO ADDRESS (ID, isBilling, createdDate, prefix, streetNumber, streetName, suburb, city, country, postcode, clientId)
VALUES
   (6, false, to_date('2019-08-07', 'YYYY-MM-DD'), '', '88', 'Seventh Avanue', 'Kedron', 'Brisbane', 'Australia', 4030, 1);

INSERT INTO ADDRESS (ID, isBilling, createdDate, prefix, streetNumber, streetName, suburb, city, country, postcode, clientId)
VALUES
   (7, false, to_date('2019-10-01', 'YYYY-MM-DD'), '', '115', 'Lutwyche road', 'Lutwyche', 'Brisbane', 'Australia', 4030, 3);

CREATE TABLE CUSTOMER
(
ID    INT primary key
,firstname  varchar(100)
,lastname  varchar(100)
,dob  date
,email  varchar(500)
,addressID INT
,FOREIGN KEY (addressID) REFERENCES ADDRESS(ID)
);
create index ID_IDX on CUSTOMER using btree(ID asc);

INSERT INTO CUSTOMER (ID, firstname, lastname, dob, email, addressID)
VALUES
   (1, 'John', 'McNair', to_date('1989-09-01', 'YYYY-MM-DD'), 'John_McNair@gmail.com', 2);
INSERT INTO CUSTOMER (ID, firstname, lastname, dob, email, addressID)
VALUES
   (2, 'Tim', 'Fanic', to_date('1980-10-11', 'YYYY-MM-DD'), 'Tim_Fanic@hotmail.com', 5);
INSERT INTO CUSTOMER (ID, firstname, lastname, dob, email, addressID)
VALUES
   (3, 'Zhufu', 'Lee', to_date('1985-06-28', 'YYYY-MM-DD'), 'Zhufu_L@sina.com', 1);
INSERT INTO CUSTOMER (ID, firstname, lastname, dob, email, addressID)
VALUES
   (4, 'Marybell', 'Fang', to_date('1981-10-01', 'YYYY-MM-DD'), 'Marybell_F@yahoo.com',3);

CREATE TABLE ORDERS
(
ID    INT primary key
,ordername  varchar(100)
,price  INT
,orderdate  date
);
INSERT INTO ORDERS (ID, ordername, price, orderdate)
VALUES
   (1, 'Apple iPad', 899, to_date('2019-09-01', 'YYYY-MM-DD'));
INSERT INTO ORDERS (ID, ordername, price, orderdate)
VALUES
   (2, 'Lenovo X1', 2099, to_date('2019-05-21', 'YYYY-MM-DD'));
INSERT INTO ORDERS (ID, ordername, price, orderdate)
VALUES
   (3, 'Sony a7 mark iii', 2569, to_date('2019-11-06', 'YYYY-MM-DD'));
INSERT INTO ORDERS (ID, ordername, price, orderdate)
VALUES
   (4, 'Keyboard', 129, to_date('2019-07-15', 'YYYY-MM-DD'));
INSERT INTO ORDERS (ID, ordername, price, orderdate)
VALUES
   (5, 'Xiaomi Mi9', 1350, to_date('2019-11-01', 'YYYY-MM-DD'));
