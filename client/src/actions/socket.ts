import toolState from "../store/toolState";

export const socketOpenWithSendConnection = (socket: WebSocket, id: string, userName: string) => {
  socket.onopen = () => {
    socket.send(JSON.stringify({
      id: id,
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

export const socketSendDrawWith = (socket: WebSocket, ctx: CanvasRenderingContext2D | null, figure: {[key in string]: any}, id: string) => {
  if(!ctx) return null;
  socket.send(JSON.stringify({
    method: 'draw',
    id: id,
    figure: {
      ...figure,
      strokeColor: toolState.strokeColor,
      fillColor: toolState.fillColor,
      lineWidth: toolState.lineWidth
    }
  }))
}

export const socketSendDrawWithFinish = (socket: WebSocket, id: string) => {
  const finishFigure = {
    type: 'finish',
  };
  socketSendDrawWith(
    socket,
    null,
    finishFigure,
    id
  )
}
