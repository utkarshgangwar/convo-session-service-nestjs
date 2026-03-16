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

MONGO_URI=mongodb://localhost:27017/conversation

## Assumptions

- sessionId provided externally
- events immutable
- duplicate events prevented via index