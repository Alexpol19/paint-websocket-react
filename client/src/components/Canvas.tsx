import { observer } from "mobx-react-lite"
import "../style/canvas.scss"
import { useEffect, useRef } from "react"
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"
import { useParams } from "react-router-dom"
import Rect from "../tools/Rect"
import Eraser from "../tools/Eraser"
import Circle from "../tools/Circle"
import Line from "../tools/Line"
import { socketOnMessage, socketOpenWithSendConnection } from "../actions/socket"
import { getImage, sendImage } from "../actions/api"
import InitialModal from "./InitialModal"

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const params = useParams()

  const mouseUpHandler = () => {
    if(canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current?.toDataURL())
      if(!params.sessionId) return null;
      sendImage(canvasRef.current, params.sessionId)
    }
  }

  const drawHandler = (msg: {[key in string]: any}) => {
    const figure = msg.figure
    if(canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if(!ctx) return null
      if(figure.lineWidth) {
        ctx.lineWidth = figure.lineWidth
      }
      switch (figure.type) {
        case "brush":
          Brush.staticDraw(ctx, figure.x, figure.y, figure.strokeColor)
          break
        case "eraser":
          Eraser.staticDraw(ctx, figure.x, figure.y)
          break
        case "line":
          Line.staticDraw(ctx, figure.startX, figure.endX, figure.startY, figure.endY, figure.strokeColor)
          ctx.beginPath()
          break
        case "rect":
          Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.strokeColor, figure.fillColor)
          ctx.beginPath()
          break
        case "circle":
          Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.strokeColor, figure.fillColor)
          ctx.beginPath()
          break
        case "finish":
          ctx.beginPath()
          break
      }
    }
  }

  useEffect(() => {
    if(canvasRef.current) {
      canvasState.setCanvas(canvasRef.current)
      let ctx = canvasRef.current.getContext('2d')
      if(ctx && params.sessionId) {
        getImage(params.sessionId)
          .then(response =>{
            const img = new Image()
            img.src = response.data
            img.onload = () => {
              if(canvasRef.current) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
              }
            }
          })
      }
    }
  }, [])

  useEffect(() => {
    if(canvasState.userName && canvasRef.current && params.sessionId) {
      const socket = new WebSocket('ws://localhost:3000/')
      
      canvasState.setCanvas(canvasRef.current)
      toolState.setTool(new Brush(canvasRef.current, socket, params.sessionId))
      toolState.setFillColor('#000')
      toolState.setStrokeColor('#000')
      toolState.setLineWidth(1)
      canvasState.setSocket(socket)
      canvasState.setSessionId(params.sessionId)

      socketOpenWithSendConnection(socket, params.sessionId, canvasState.userName)
      socketOnMessage(socket, drawHandler)
    }
  }, [canvasState.userName])

  return (
    <div  className="canvas">
      <InitialModal />
      <canvas
        onMouseUp={() => mouseUpHandler()}
        ref={canvasRef} width={600} height={400} />
    </div>
  )
})

export default Canvas
