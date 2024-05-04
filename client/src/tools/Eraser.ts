import Brush from "./Brush";

export default class Eraser extends Brush {
  mouseDown: boolean = false
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id);
  }

  draw(x: number, y: number) {
    if(this.ctx) {
      this.ctx.strokeStyle = "white"
      this.ctx.lineTo(x,y)
      this.ctx.stroke()
    }
  }
}