import { socketSendDrawWith } from "../actions/socket";
import toolState from "../store/toolState";
import Tool from "./Tool";

export default class Rect extends Tool {
  mouseDown: boolean = false
  startX: number = 0
  startY: number = 0
  width: number = 0
  height: number = 0
  saved: string = ''
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
      type: 'rect',
      x: this.startX,
      y: this.startY,
      width: this.width,
      height: this.height,
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
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height)
    }
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height )
      this.ctx?.beginPath()
      this.ctx?.rect(x,y, w, h)
      this.ctx?.fill();
      this.ctx?.stroke();
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, strokeColor: string, fillColor: string) {
    ctx.beginPath()
    ctx.strokeStyle = strokeColor
    ctx.fillStyle = fillColor
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.stroke()
  }
}
