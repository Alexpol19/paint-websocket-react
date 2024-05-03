import { observer } from "mobx-react-lite"
import "../style/canvas.scss"
import { useEffect, useRef } from "react"
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"

const Canvas = observer(() => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouseDownHandler = () => {
    if(canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current?.toDataURL())
    }
  }

  useEffect(() => {
    if(canvasRef.current) {
      canvasState.setCanvas(canvasRef.current)
      toolState.setTool(new Brush(canvasRef.current))
    }
  }, [])
  return (
    <div  className="canvas">
      <canvas
        onMouseDown={() => mouseDownHandler()}
        ref={canvasRef} width={600} height={400} />
    </div>
  )
})

export default Canvas
