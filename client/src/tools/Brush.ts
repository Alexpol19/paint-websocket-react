import { socketSendDrawWith, socketSendDrawWithFinish } from "../actions/socket";
import Tool from "./Tool";

export default class Brush extends Tool {
  mouseDown: boolean = false
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id);
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false
    socketSendDrawWithFinish(this.socket, this.id)
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx?.beginPath()
    this.ctx?.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
  }

  mouseMoveHandler(e: any) {
    if(this.mouseDown) {
      const figure = {
        type: 'brush',
        x: e.pageX - e.target.offsetLeft,
        y: e.pageY - e.target.offsetTop,
      };
  
      socketSendDrawWith(
        this.socket,
        figure,
        this.id,
      )
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, strokeColor: string) {
    ctx.strokeStyle = strokeColor
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}
