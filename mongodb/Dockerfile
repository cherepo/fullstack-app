FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db graphql --collection CustomerComments --type json --file /init.json --jsonArray