# Conversation Session Service

## Setup

npm install

## Run

npm run start:dev

## API Endpoints

POST /sessions
POST /sessions/:sessionId/events
GET /sessions/:sessionId
POST /sessions/:sessionId/complete

## Database

MongoDB required.

MONGO_URI=mongodb://localhost/convo-session-service

## Assumptions

- sessionId provided externally
- events immutable
- duplicate events prevented via index