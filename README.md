# WebSocket-Powered React Canvas (PAINT)

## A real-time painting application developed using React TypeScript and Canvas, empowered by Express and WebSocket on the server side. Users within a shared session, identified by a specific ID, can collectively draw and interact on the same canvas in real-time.

## How to run

### 1. To start the client side, open a new terminal and run the following:
```bash
# Install dependencies
cd client
npm install
# To run project execute
npm run dev
```
### 2. To start the server side, open a new terminal and run the following:
```bash
# Install dependencies
cd server
npm install
# To run project execute
npm run dev
```

The application does not require a database at this time, so the steps above are sufficient to get the project started.

### 3. Open the local project URL to see the application: http://localhost:5173/

The session ID will be automatically generated and added to the URL parameters, so after any page refresh you will remain on the same canvas.
But when you open the same session in different browser tabs, a new user will be created.
