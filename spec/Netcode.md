# Security
- Packages are json objects that follow a schema.
- Packges must be escaped when transfering front->back
- String fields sent to dispatch have a fixed length.
- String fields that exceed the fixed length will result in an error

# Readme
Fields with a prefix "!" are not guaranteed to exist.

# Structure
Packages are JSON objects with two top-level fields. 

| Identifier | Type | Description |
|--- |--- |--- |
| header | Object(Header) | Communicates the intention of the data package |
| body | Object(Any) | Contains the rest of the data |
| footer | Object(Footer) | Contains relevant external data (timestamp, analytics, etc). Automatically added. |

## Footer
The footer contains complimentary external data such as timestamps, execution time and other analytics per-request.

> Footer Structure

| Identifier | Type | Description |
|--- |--- |--- |
| t | timestamp | timestamp of when package was created |
| !dt | integer | the amount of time it took to complelte a transaction |
| !op | integer | the session operation number. This number incriments for every operation ever done. |
| !delay | integer | how long the instance should wait before sending the next package of the same scope |


## Header
These elements must be included within the header

> Header structure

| Identifier | Type | Description |
|--- |--- |--- |
| scope | integer | denotes the scope of operations. Refer to the scope table |
| internal | boolean | set to true if the request is not made on the behalf of a user. Will alert instances to ignore the next two fields |
| user | Snowflake | The ID of the user that requested this operation. |
| channel | Snowflake | The channel ID in which the operation was requested |
| body | boolean | true if the package contains a body |
| !footerInclude | String[] | the fields the response footer should include, if any. Simply a list of footer field identifiers. Will only accept the ones that exist. |

### Scope Table
The scope field determines the scope of operations for a packet. This is used to route the packet to the appropriate handler/s.

> Scope table

| Number | Name | Description | Front Response | Dispatch Response |
|--- |--- |--- |--- |--- |
| 0 | PING | A simple ping request. | Packet(PING_RESPONSE) | Packet(PING_RESPONSE)|
| 1 | PING_RESPONSE | A response to a ping request | ~ | ~ |

> Front response: The response from a coffee-front instance

> Dispatch response: The response from a dispatch instance

## Header Packages

### PING
#### Header
| Identifier | Type | Description |
|--- |--- |--- |
| scope | number | 0 |
| internal | boolean | true |
| body | boolean | false |