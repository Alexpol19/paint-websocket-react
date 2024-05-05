import Tool from "./Tool";

export default class Line extends Tool {
  mouseDown: boolean = false
  startX: number = 0
  endX: number = 0
  startY: number = 0
  endY: number = 0
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
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      figure: {
        type: 'line',
        startX: this.startX,
        endX: this.endX,
        startY: this.startY,
        endY: this.endY,
        color: this.ctx?.strokeStyle
      }
    }))
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx?.beginPath()
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.ctx?.moveTo(this.startX, this.startY)
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e: any) {
    if(this.mouseDown) {
      this.endX = e.pageX - e.target.offsetLeft;
      this.endY = e.pageY - e.target.offsetTop;
      this.draw(this.endX, this.endY)
    }
  }

  draw(x: number, y: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      if(this.ctx) {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.beginPath()
        this.ctx.moveTo(this.startX, this.startY )
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
      }
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D, startX: number, endX: number, startY: number, endY: number, color: string) {
    ctx.strokeStyle = color;
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
  }
}
