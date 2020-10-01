# Command Structure

### Commands
Commands are "action requests" which are recieved in the frontend from an end-user.


### Commander
Commander is a command manager that parses user input and produces a command context. It also schedules commands to limit execution and response time.

#### Commander limiters
`Execution soft limiting` is done by placing command contexts into a timed boundless queue.

> Use cases
> - Limiting the use of a command 

`Execution hard limiting` is done by placing command contexts into a bound queue and discarding other action requests until the queue has a free slot.

`Response soft limiting` is done by placing responses into a timed boundless queue, preventing rate-limit events.

`Response hard limiting` is done by placing responses contexts into a timed bound queue and discarding other action requests until the queue is completely empty.

