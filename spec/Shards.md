# Definitions
"EUC" - Enduser channel, in the context of discord. This is either a DM or guild channel. For the purposes of spec, EUC implementations will support both DM and Guild channel 

# Communication

## Bidirectional shard-head communication
### Shard Scope
Shards can
	- Accept input from the end-user
	- Interface with the head
	- Bidirectionally formats data
		- Data from a head to the user
		- Data from the user to the head
	- Buffer I/O to prevent DOS
	- Only send messages to EUC

Shards cannot
	- Perform game-level calculations
	- Send responses without a head invocation

### 
The shards 