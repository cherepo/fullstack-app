# Consul discovery service

Consul has three main features:
1. Service discovery — Allow services to register and clients to use DNS or HTTP to discover registered services.
2. Health Checking — Ability to define health check cooperation that consul can execute and define the health state of a monitored node. Once a node is considered unhealthily consul can stop routing traffic to that node. (The node address will not be published during service discovery request by other clients)
3. KV Store — Client can store and publish Key/value data, this can be useful for configuration feature flag and other means of communication between nodes.

Consul is running as a background daemon on a running host, a Consul agent can run in two modes, client or server.

Client agent — Accept a request and forwards them to a server agent for a reply. Usually, an application communicates with the locally running Consul agent client to discover other services by using HTTP or DNS requests (or using K/V storage). There is no penalty for running a large fleet of consul clients and they can scale along with your service hosts.

Server agent — Communicates with other server agents and creates a Raft peer set. The server agents will elect one leader out of the set. They are also responsible to reply to RPC queries. It is recommended to have between 3–5 server agents.

The way to use Service Discovery is to use Nginx with Consul template, which described [here](https://learn.hashicorp.com/consul/integrations/nginx-consul-template). Another example also [here](https://github.com/nginxinc/NGINX-Demos/tree/master/consul-template-demo). [This article](https://danielparker.me/nginx/consul-template/consul/nginx-consul-template/) explains better in common examples.
