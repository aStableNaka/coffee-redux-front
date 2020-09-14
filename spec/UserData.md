# Userdata

User data is distributed through the coffee network as a system of "ownerships". UserData can only be held by one instance of a microservice at any given time. By default, ownership of any userData is given to a coffee-database instance. Microservices that wish to access data must be transfered ownership of the data. Once ownership is transfered, the microservice has full access to database operations that given userdata document.

When a microservice requests userdata ownership, ownership must be transfered.

If MS-1 wants to borrow data that belongs to MS-2, MS-1 must send an ownership request to dispatch. Dispatch will then send another ownership request to ms2. If ms2 agrees, ms2 will send a data transfer package back to dispatch for further routing and delete its internal cache of the data.