import { observer } from "mobx-react-lite"
import "../style/canvas.scss"
import { useEffect, useRef, useState } from "react"
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"
import { Button, Modal } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Rect from "../tools/Rect"
import axios from "axios"

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const [modal, setModal] = useState(true)
  const params = useParams()

  const mouseUpHandler = () => {
    if(canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current?.toDataURL())
      axios.post(`http://localhost:3000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
        .then(response => console.log(response.data))
    }
  }

  const connectHandler = () => {
    if(usernameRef.current){
      canvasState.setUsername(usernameRef.current.value)
      setModal(false)
    }
  }

  const drawHandler = (msg: {[key in string]: any}) => {
    const figure = msg.figure
    if(canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if(!ctx) return null
      switch (figure.type) {
          case "brush":
              Brush.draw(ctx, figure.x, figure.y)
              break
          case "rect":
              Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
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
      if(ctx) {
        axios.get(`http://localhost:3000/image?id=${params.id}`)
          .then(response => {
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
    if(canvasState.userName && canvasRef.current) {
      const socket = new WebSocket('ws://localhost:3000/')
      
      canvasState.setCanvas(canvasRef.current)
      toolState.setTool(new Brush(canvasRef.current, socket, params.id || ''))
      canvasState.setSocket(socket)
      canvasState.setSessionId(params.id || '')
      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: params.id,
          username: canvasState.userName,
          method: "connection"
        }))
      }

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
  }, [canvasState.userName])
  return (
    <div  className="canvas">
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header >
          <Modal.Title>Enter your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectHandler()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseUp={() => mouseUpHandler()}
        ref={canvasRef} width={600} height={400} />
    </div>
  )
})

export default Canvas
