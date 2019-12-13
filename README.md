# TheProject

This project is mean to be a container which contains a series of reference projects that demostrate modern full-stack. This includes:

- An Angular frontend applciation: Jest, Observable, NGRX, Cypress
- A GraphQL application acting as BFF
- Two Kotlin service acting as two separate APIs: CompletableFuture, ReactJava (2)
- Jenkins build CI
- Consul server and client (Kuternates/Console)
- Keycloak for login service (8180)
- MongoDB
- Postgresql: che-postgresql(5432) and keycloak-postgresql()
- Mockserver: a node REST api mock running (2345)
- Google Analytics

## Frontend Angular

## Keycloak

Some simple setup example are

- create a realm
- create a client with valid ID and valid redirect URI
- create a Role
- create a User and set credentials
- from “Role Mappings” tab to assign user role
- custom a [theme](https://github.com/austincunningham/raincatcher-keycloak-theme) or use own login page

Keycloak provides a REST API for generating and refreshing access tokens. We can easily use this API to create our own login page. First, we need to acquire an access token from Keycloak by sending a POST request to this URL:

```txt
http://localhost:8180/auth/realms/master/protocol/openid-connect/token
```

with a request like

```json
{
    'client_id': 'your_client_id',
    'username': 'your_username',
    'password': 'your_password',
    'grant_type': 'password'
}
```

In response, we'll get an access_token and a refresh_token. The access token should be used in every request to a Keycloak-protected resource by simply placing it in the Authorization header:

```json
headers: {
    'Authorization': 'Bearer' + access_token
}
```

Once the access token has expired, we can refresh it by sending a POST request to the same URL as above, but containing the refresh token instead of username and password:

```json
{
    'client_id': 'your_client_id',
    'refresh_token': refresh_token_from_previous_request,
    'grant_type': 'refresh_token'
}
```

## Tooling

# Document References

- [BFF, Consul, and Microservices](https://medium.com/tech-tajawal/backend-for-frontend-using-graphql-under-microservices-5b63bbfcd7d9)
