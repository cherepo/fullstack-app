# Keycloak
Keycloak is an open source Identity and Access Management solution aimed at modern applications and services. It makes it easy to secure applications and services with little to no code.

## Read List

- [15 minutes](https://medium.com/docker-hacks/how-to-apply-authentication-to-any-web-service-in-15-minutes-using-keycloak-and-keycloak-proxy-e4dd88bc1cd5)
- [Keycloak make simple](https://aaronparecki.com/oauth-2-simplified/)
- [Awesome Keycloak](https://github.com/thomasdarimont/awesome-keycloak)
- [Official Documents](https://www.keycloak.org/docs/latest/server_admin/index.html#core-concepts-and-terms)

## Setup server

### Create a new realm

A realm is a domain in which several types of entities can be defined, the most prominent being:

- Users: basic entities that are allowed access to a Keycloak-secured system.
- Roles: a User’s authorization level, such as admin/manager/reader.
- Clients: browser apps and web services that are allowed to request a login.
- Identity Providers: external providers to integrate with, such as Google, Facebook, or any OpenID Connect/SAML 2.0 based system.

### Add a user

After creating the user, you’ll need to set up his password. Go to Credentials tab, enter the new password twice and hit Reset Password. To check user cheng in this project, try following

```txt
http://localhost:8180/auth/realms/cheapp/account
```

### Add a client

The final step of the initial server configuration is to create a client. Clients are browser apps and web services that are either allowed to initiate the login process or have been provided with tokens resulting from earlier logins. Give name like ng-app-client with the route url `http://localhost:4200`. Hit Save and you’ll be taken to the client details panel. 

First important client setting is `Access Type`.

- Bearer-only – this is for services that rely solely on the bearer token included in the request and never initiate login on their own. It’s typically used for securing the back-end.
- Confidential – clients of this type need to provide a secret in order to initiate the login process.
- Public – since we have no real way of hiding the secret in a JS-based browser app, this is what we need to stick with.

Next comes Valid Redirect URIs – this is the URI pattern (one or more) which the browser can redirect to after completing the login process. Since we picked public access type for our client (and thus anyone can ask to initiate the login process), this is especially important. In a real app, you will need to make sure you  make this pattern as restrictive as possible, otherwise, you could open your system to phishing attacks! However, for dev purposes, you can just leave it at default.

Finally, the last of the important options is Web Origins, which governs CORS requests. Again, for dev purposes the default value is fine.

### Retrieve config

Go to Installation tab in client creation, and copy configuration

## Frontend talk to Keycloak

For Frontend to talk to Keycloak, we need these dependencies

```text
keycloak-js
keycloak-angular (for angular only)
```

Then we need to check somewhere when page load or routing, and if keycloak not authorized, then redirect to keycloak for login. Otherwise add the JWT token to each backend request.

For ReactJS, we can do something like this

```js
...
import Keycloak from 'keycloak-js';
...
componentDidMount() {
  const keycloak = Keycloak('/keycloak.json');
  keycloak.init({onLoad: 'login-required'}).success(authenticated => {
    this.setState({ keycloak: keycloak, authenticated: authenticated })
  })
}
```

Then add to header

```js
  authorizationHeader() {
    if(!this.props.keycloak) return {};
    return {
      headers: {
        "Authorization": "Bearer " + this.props.keycloak.token
      }
    };
  }

  handleClick = () => {
    fetch('http://localhost:9000/users', this.authorizationHeader())
      .then(response => {
        if (response.status === 200)
          return response.json();
        else
          return { status: response.status, message: response.statusText }
      })
      .then(json => this.setState((state, props) => ({
        response: JSON.stringify(json, null, 2)
      })))
      .catch(err => {
        this.setState((state, props) => ({ response: err.toString() }))
      })
  }
```

## Backend validate the token

Basically, the concept is frontend needs to get the token from Keycloak, and insert this token to the header and from now on every single request to backend will need this token. So how backend varify this token? There are mainly two ways:

**First** is to simply ask Keycloak about it. We can do this using the token introspection endpoint that Keycloak provides. This is a completely viable option and in fact is often used in those OAuth2-based systems that require fine-grained server-side control over tokens (e.g. the possibility to arbitrarily revoke a single token). However, this method requires a separate call to Keycloak every time we want to verify a token (unless we include some caching mechanism on the client side, which would introduce yet another layer of complexity).

**The Second** is OpenID protocol. By default, Keycloak use this protocol, which is an extension atop OAuth2. This means that every access token is a **JSON Web Token that holds signed, base64-encoded user information in itself**. If you look again at the token attached to our request, you’ll be able to see two dots in its body which separate it into three parts:

The first part decode into this

```json
{
  "alg" : "RS256", //denotes the type of algorithm used for signing the token
  "typ" : "JWT",
  "kid" : "NgN92teIobiB0ayAJofvHPimh_l6EEImAtH8WJ-aBuc" //stands for key ID
}
```

We’ve seen before that our token has been signed with the RSA algorithm. As you’re probably aware, RSA is an asymmetric system, so in order to verify the signature we’ll need a public key. Where do we get it from? That’s easy – from Keycloak itself.

The second part decode into something like this (akka claims), [more details](https://www.iana.org/assignments/jwt/jwt.xhtml)

```json
{  
   "jti":"9df7224d-b9cc-4577-80e1-8550b17e3101",
   "exp":1539103331,
   "nbf":0,
   "iat":1539103031,
   "iss":"http://localhost:8080/auth/realms/MyDemo",
   "aud":"my-react-client",
   "sub":"b66cf217-c032-4b0c-a7c7-aeb26c4b2931",
   "typ":"Bearer",
   "azp":"my-react-client",
   "nonce":"4eac3fb1-cf9a-4430-b538-0fba8692ec63",
   "auth_time":1539103030,
   "session_state":"28bd3ca8-a5fa-4109-9011-5a4846d4b8d9",
   "acr":"1",
   "allowed-origins":[  
      "http://localhost:3000"
   ],
   "realm_access":{  
      "roles":[  
         "uma_authorization"
      ]
   },
   "resource_access":{  
      "account":{  
         "roles":[  
            "manage-account",
            "manage-account-links",
            "view-profile"
         ]
      }
   },
   "name":"Jakub Mikulski",
   "preferred_username":"jakub",
   "given_name":"Jakub",
   "family_name":"Mikulski",
   "email":"test@example.com"
}
```

## Spring App

> "Keycloak client adapters are libraries that makes it very easy to secure applications and services with Keycloak."

