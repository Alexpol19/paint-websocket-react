import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import "../style/toolbar.scss"
import Brush from "../tools/Brush"
import Circle from "../tools/Circle"
import Eraser from "../tools/Eraser"
import Line from "../tools/Line"
import Rect from "../tools/Rect"

const Toolbar = () => {

  return (
    <div className="toolbar">
      <button className="toolbar__btn brush"
        onClick={() => canvasState.canvas ? toolState.setTool(new Brush(canvasState.canvas)) : () => {}}
        // onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))}
      />
      <button className="toolbar__btn rect"
        onClick={() => canvasState.canvas ? toolState.setTool(new Rect(canvasState.canvas)) : () => {}}
        // onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))}
      />
      <button className="toolbar__btn circle"
        onClick={() => canvasState.canvas ? toolState.setTool(new Circle(canvasState.canvas)) : () => {}}
      />
      <button className="toolbar__btn eraser"
        onClick={() => canvasState.canvas ? toolState.setTool(new Eraser(canvasState.canvas)) : () => {}}
      />
      <button className="toolbar__btn line"
        onClick={() => canvasState.canvas ? toolState.setTool(new Line(canvasState.canvas)) : () => {}}
      />
      <input
        onChange={e => toolState.setFillColor(e.target.value)}
        style={{marginLeft:10}} type="color"/>
      <button className="toolbar__btn undo"
        onClick={() => canvasState.undo()}
      />
      <button className="toolbar__btn redo"
        onClick={() => canvasState.redo()}
      />
      <button className="toolbar__btn save"
        // onClick={() => download()}
      />
    </div>
  )
}

export default Toolbar
