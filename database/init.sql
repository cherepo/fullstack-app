-- CREATE USER docker;

-- CREATE DATABASE docker
--   WITH OWNER = docker
--        ENCODING = 'UTF8'
--        TABLESPACE = pg_default
--        CONNECTION LIMIT = -1;

-- GRANT ALL PRIVILEGES ON DATABASE docker TO docker;

CREATE TABLE ADDRESS
(
ID    INT primary key
,buildingname varchar(100)
,streetnumber varchar(20)
,streetname  varchar(200)
,suburb  varchar(50)
,city varchar(50)
,country varchar(50)
,postcode INT
);
create index ID_ADDRESS_IDX on ADDRESS using btree(ID asc);

INSERT INTO ADDRESS (ID, buildingname, streetnumber, streetname, suburb, city, country, postcode)
VALUES
   (1, '', '200', 'Adelaide Street', 'Brisbane', 'Brisbane', 'Australia', 4000);

INSERT INTO ADDRESS (ID, buildingname, streetnumber, streetname, suburb, city, country, postcode)
VALUES
   (2, '', '160', 'Wickham terrace', 'Sprin Hill', 'Brisbane', 'Australia', 4006);

INSERT INTO ADDRESS (ID, buildingname, streetnumber, streetname, suburb, city, country, postcode)
VALUES
   (3, '', '140', 'Pembrook Road', 'Cooparoo', 'Brisbane', 'Australia', 4012);

INSERT INTO ADDRESS (ID, buildingname, streetnumber, streetname, suburb, city, country, postcode)
VALUES
   (4, '', '12', 'Readon Street', 'Calamvale', 'Brisbane', 'Australia', 4116);

INSERT INTO ADDRESS (ID, buildingname, streetnumber, streetname, suburb, city, country, postcode)
VALUES
   (5, '', '26', 'Laminton Street', 'Herston', 'Brisbane', 'Australia', 4006);

INSERT INTO ADDRESS (ID, buildingname, streetnumber, streetname, suburb, city, country, postcode)
VALUES
   (6, '', '88', 'Seventh Avanue', 'Kedron', 'Brisbane', 'Australia', 4030);

INSERT INTO ADDRESS (ID, buildingname, streetnumber, streetname, suburb, city, country, postcode)
VALUES
   (7, '', '115', 'Lutwyche road', 'Lutwyche', 'Brisbane', 'Australia', 4030);

CREATE TABLE CUSTOMER
(
ID    INTEGER primary key
,firstname  varchar(100)
,lastname  varchar(100)
,dob  date
,email  varchar(500)
,address_id INTEGER REFERENCES ADDRESS(ID)
);
create index ID_IDX on CUSTOMER using btree(ID asc);

INSERT INTO CUSTOMER (ID, firstname, lastname, dob, email, address_id)
VALUES
   (1, 'John', 'McNair', to_date('1989-09-01', 'YYYY-MM-DD'), 'John_McNair@gmail.com', 1);
INSERT INTO CUSTOMER (ID, firstname, lastname, dob, email, address_id)
VALUES
   (2, 'Tim', 'Fanic', to_date('1980-10-11', 'YYYY-MM-DD'), 'Tim_Fanic@hotmail.com', 4);
INSERT INTO CUSTOMER (ID, firstname, lastname, dob, email, address_id)
VALUES
   (3, 'Zhufu', 'Lee', to_date('1985-06-28', 'YYYY-MM-DD'), 'Zhufu_L@sina.com', 5);
INSERT INTO CUSTOMER (ID, firstname, lastname, dob, email, address_id)
VALUES
   (4, 'Marybell', 'Fang', to_date('1981-10-01', 'YYYY-MM-DD'), 'Marybell_F@yahoo.com', 2);

CREATE TABLE ORDERS
(
ID    INTEGER primary key
,customer_id INTEGER REFERENCES CUSTOMER(ID)
,ordername  varchar(100)
,price  INTEGER
,orderdate  date
);
INSERT INTO ORDERS (ID, customer_id, ordername, price, orderdate)
VALUES
   (1, 1, 'Apple iPad', 899, to_date('2019-09-01', 'YYYY-MM-DD'));
INSERT INTO ORDERS (ID, customer_id, ordername, price, orderdate)
VALUES
   (2, 2, 'Lenovo X1', 2099, to_date('2019-05-21', 'YYYY-MM-DD'));
INSERT INTO ORDERS (ID, customer_id, ordername, price, orderdate)
VALUES
   (3, 2, 'Sony a7 mark iii', 2569, to_date('2019-11-06', 'YYYY-MM-DD'));
INSERT INTO ORDERS (ID, customer_id, ordername, price, orderdate)
VALUES
   (4, 4, 'Keyboard', 129, to_date('2019-07-15', 'YYYY-MM-DD'));
INSERT INTO ORDERS (ID, customer_id, ordername, price, orderdate)
VALUES
   (5, 2, 'Xiaomi Mi9', 1350, to_date('2019-11-01', 'YYYY-MM-DD'));
