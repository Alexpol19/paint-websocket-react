import express from 'express'
import WSserver from 'express-ws'
import fs from 'fs'
import path from 'path'
import cors from 'cors'

const WSServer = WSserver(express())
const app = WSServer.app
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 3000

interface WebSocket {
  sessionId?: string
}

app.use(cors())
app.use(express.json())

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

app.post('/image', (req, res) => {
  try {
    const data = req.body.img.replace(`data:image/png;base64,`, '')

    const filesFolderPath = path.resolve(__dirname, '../files');

    if (!fs.existsSync(filesFolderPath)) {// ensure files folder exist
      fs.mkdirSync(filesFolderPath);
    }

    fs.writeFileSync(path.resolve(__dirname, '../files', `${req.query.id}.jpg`), data, 'base64')
    return res.status(200).json({message: "Loaded"})
  } catch (e) {
    console.log(e)
    return res.status(500).json('error')
  }
})

app.get('/image', (req, res) => {
  try {
    const file = fs.readFileSync(path.resolve(__dirname, '../files', `${req.query.id}.jpg`))
    const data = `data:image/png;base64,` + file.toString('base64')
    res.json(data)
  } catch (e) {
    console.log(e)
    return res.status(500).json('error')
  }
})

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

const connectionHandler = (ws: WebSocket, msg: {[key in string]: any} ) => {
  ws.sessionId = msg.sessionId
  broadcastConnection(ws, msg)
}

const broadcastConnection = (ws: WebSocket, msg: {[key in string]: any}) => {
  aWss.clients.forEach((client: any) => {
    if (client.sessionId === msg.sessionId) {
      client.send(JSON.stringify(msg))
    }
  })
}
