import toolState from "../store/toolState";

export const socketOpenWithSendConnection = (socket: WebSocket, sessionId: string, userName: string) => {
  socket.onopen = () => {
    socket.send(JSON.stringify({
      sessionId,
      username: userName,
      method: "connection"
    }))
  }
}

export const socketOnMessage = (
  socket: WebSocket,
  drawHandler: (msg: {
    [x: string]: any;
  }) => any
) => {
  socket.onmessage = (e: MessageEvent) => {
    let msg: {[key in string]: any} = JSON.parse(e.data)
    switch (msg.method) {
      case "connection":
        console.log(`User ${msg.username} is connected`)
        break
      case "draw":
        drawHandler(msg)
        break
    }
  }
}

export const socketSendDrawWith = (socket: WebSocket, figure: {[key in string]: any}, sessionId: string) => {
  socket.send(JSON.stringify({
    method: 'draw',
    sessionId,
    figure: {
      ...figure,
      strokeColor: toolState.strokeColor,
      fillColor: toolState.fillColor,
      lineWidth: toolState.lineWidth
    }
  }))
}

export const socketSendDrawWithFinish = (socket: WebSocket, sessionId: string) => {
  const finishFigure = {
    type: 'finish',
  };
  socketSendDrawWith(
    socket,
    finishFigure,
    sessionId
  )
}
