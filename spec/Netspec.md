# Security
- Packages are json objects that follow a schema.
- Packges must be escaped when transfering front->back
- String fields sent to dispatch have a fixed length.
- String fields that exceed the fixed length will result in an error
- Packages must be encoded with JWT

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
| destination | nodeID string | the intended destination of this request, for routing |
| user | Snowflake | The ID of the user that requested this operation. |
| channel | Snowflake | The channel ID in which the operation was requested |
| body | boolean | true if the package contains a body |
| !footerInclude | String[] | the fields the response footer should include, if any. Simply a list of footer field identifiers. Will only accept the ones that exist. |

### Scope Table
The scope field determines the scope of operations for a packet. This is used to route the packet to the appropriate handler/s.

> Scope table

| Number | Name | Description | Front Response | Dispatch Response |
|--- |--- |--- |--- |--- |
| 0 | PING | A simple ping request. | PING_RESPONSE | PING_RESPONSE |
| 1 | PING_RESPONSE | A response to a ping request | ~ | ~ |
| 100 | UD_REQ_OWNERSHIP | Request ownership of a user's data | UD_100_TRANSFER | UD_100_TRANSFER | 
| 101 | UD_TRANSFER | Contains userdata for transfering | ~ | ~ |
| 102 | UD_REVOKE | Revokes a microservice's access to userdata | ~ | ~ |

> Front response: The response from a coffee-front instance

> Dispatch response: The response from a dispatch instance

## Header Packages

### PING (0) Request
A simple ping request. Sent from a microservice.

> Example
```json
	{
		"header":{
			"scope": 0,
			"internal": true,
			"body": false
		}
	}
```

> Header fields

| Identifier | Type | Description |
|--- |--- |--- |
| scope | number | 0 |
| internal | boolean | true |
| body | boolean | false |

### PING_RESPONSE (1) Response

> Example
```json
	{
		"header":{
			"scope": 1,
			"internal": true,
			"body": false
		}
	}
```

> Header fields

| Identifier | Type | Description |
|--- |--- |--- |
| scope | number | 1 |
| internal | boolean | true |
| body | boolean | true |
| footerInclude | string[] | ["dt"] |

### UD_REQ_OWNERSHIP (100) Request
Request userdata ownership.

> Example
```json
	{
		"header":{
			"scope": 100,
			"internal": true,
			"body": true,
			"footerInclude": [ "dt" ],
			"destination": "dispatch"
		},
		"body":{
			"endpoint": "something.url/endpoint"
		}
	}
```


> Header fields

| Identifier | Type | Description |
|--- |--- |--- |
| scope | number | 100 |
| internal | boolean | true |
| body | boolean | true |

> Body fields

| Identifier | Type | Description |
|--- |--- |--- |
| nodeID | string | The destination nodeID of a microservice. Dispatch will figure out where the request needs to go. |

### UD_TRANSFER (101) Request
Request userdata ownership.

> Example
```json
	{
		"header":{
			"scope": 101,
			"internal": true,
			"body": true,
			"footerInclude": [ "dt" ],
			"destination": "nodeID"
		},
		"body":{
			"userData": {}
		}
	}
```


> Header fields

| Identifier | Type | Description |
|--- |--- |--- |
| scope | number | 100 |
| internal | boolean | true |
| body | boolean | true |

> Body fields

| Identifier | Type | Description |
|--- |--- |--- |
| userData | object | The userData document |