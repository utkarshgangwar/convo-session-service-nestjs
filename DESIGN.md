1. How did you ensure idempotency?

Idempotency is ensured mainly using unique identifiers and database constraints.

For session creation, I used MongoDB findOneAndUpdate with upsert. If the session with the same sessionId already exists, the same session is returned instead of creating a new one. This makes the API safe to call multiple times.

For events, a compound unique index on (sessionId, eventId) is used. This ensures that the same event cannot be inserted twice for a session. If a duplicate request comes, MongoDB will reject the duplicate insert.

Because of these constraints, repeated requests do not create duplicate data.

2. How does your design behave under concurrent requests?

The design relies on MongoDB atomic operations and unique indexes.

For session creation, the upsert operation ensures that even if multiple requests try to create the same session at the same time, only one document will be inserted.

For events, the compound unique index (sessionId, eventId) prevents duplicate event inserts if concurrent requests attempt to add the same event.

Because of this, the system remains consistent even when multiple requests hit the API simultaneously.

3. What MongoDB indexes did you choose and why?

I used the following indexes:

1. Unique index on sessionId (sessions collection)
This ensures each session is unique and allows fast lookup when fetching a session.

2. Compound unique index on (sessionId, eventId) (events collection)
This ensures an event cannot be added twice for the same session.

3. Index on (sessionId, timestamp) (events collection)
This helps when retrieving events for a session ordered by timestamp.

These indexes match the main query patterns used in the APIs.

4. How would you scale this system for millions of sessions per day?

The service can scale horizontally since the API is stateless.

Multiple instances of the service can run behind a load balancer to handle increased traffic.

At the database level, MongoDB sharding can be used with sessionId as the shard key. This distributes sessions and their events across multiple database nodes.

Additional improvements could include using read replicas for heavy read traffic and archiving old session data.

5. What did you intentionally keep out of scope, and why?

Some features were intentionally not implemented to keep the solution focused and simple.

Authentication and authorization were not added since the assignment explicitly says they are not required.

Background jobs, message queues, or streaming systems were also not included because they are not necessary for the core functionality.

Caching and monitoring systems were also left out to avoid unnecessary complexity for this assignment.

The goal was to focus on correctness, clarity, and core backend design.

6. Test Strategy

Tests are not fully implemented for all modules, but the approach would focus on testing core business logic.

Unit tests would be written for the service layer, especially:

session creation (idempotency behavior)

adding events (duplicate handling and validation)

completing session (idempotent updates)

Repository layer can be mocked to isolate business logic.

For integration testing, API endpoints can be tested using a test database to validate end-to-end behavior.