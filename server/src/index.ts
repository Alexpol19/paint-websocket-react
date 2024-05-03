import express from 'express'
import WSserver from 'express-ws'

const WSServer = WSserver(express())
const app = WSServer.app
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 3000

interface WebSocket {
  id?: string
}

app.ws('/', (ws, req) => {
  ws.on('message', (msg: string) => {
      const message: {[key in string]: any} = JSON.parse(msg)
      switch (message.method) {
          case "connection":
              connectionHandler(ws as WebSocket, message)
              break
          case "draw":
              broadcastConnection(ws as WebSocket, message)
              break
      }
  })
})

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

const connectionHandler = (ws: WebSocket, msg: {[key in string]: any} ) => {
  ws.id = msg.id
  broadcastConnection(ws, msg)
}

const broadcastConnection = (ws: WebSocket, msg: {[key in string]: any}) => {
  aWss.clients.forEach((client: any) => {
      if (client.id === msg.id) {
          client.send(JSON.stringify(msg))
      }
  })
}
