import { socketSendDrawWith } from "../actions/socket";
import toolState from "../store/toolState";
import Tool from "./Tool";

export default class Circle extends Tool {
  mouseDown: boolean = false
  startX: number = 0
  startY: number = 0
  saved: string = ''
  radius: number = 0
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
    const figure = {
      type: 'circle',
      x: this.startX,
      y: this.startY,
      r: this.radius,
    };

    socketSendDrawWith(
      this.socket,
      this.ctx,
      figure,
      this.id,
    )
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true
    if(this.ctx){
      this.ctx.strokeStyle = toolState.strokeColor
      this.ctx.fillStyle = toolState.fillColor
      this.ctx.lineWidth = toolState.lineWidth
      this.ctx.beginPath()
    }
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e: any) {
    if(this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      let width = currentX - this.startX;
      let height = currentY - this.startY;
      this.radius = Math.sqrt(width**2 + height**2)
      this.draw(this.startX, this.startY, this.radius)
    }
  }

  draw(x: number, y: number, r: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height )
      this.ctx?.beginPath()
      this.ctx?.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx?.fill();
      this.ctx?.stroke();
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, strokeColor: string, fillColor: string) {
    ctx.beginPath()
    ctx.strokeStyle = strokeColor
    ctx.fillStyle = fillColor
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}
