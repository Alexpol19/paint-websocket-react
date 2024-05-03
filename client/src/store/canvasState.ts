import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas!: HTMLCanvasElement
  undoList: string[] = []
  redoList: string[] = []


  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  pushToUndo(data: string) {
    this.undoList.push(data)
  }

  pushToRedo(data: string) {
    this.redoList.push(data)
  }

  undo() {
    if(!this.canvas) return null
    let ctx = this.canvas.getContext('2d');
    if(this.undoList.length) {
      let dataUrl = this.undoList.pop()
      if(dataUrl) {
        this.redoList.push(this.canvas.toDataURL());
        let img = new Image()
        img.src = dataUrl
        img.onload = () => {
          ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
          ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        }
      }
    } else {
      ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  redo() {
    if(!this.canvas) return null
    let ctx = this.canvas.getContext('2d');
    if(this.redoList.length) {
      let dataUrl = this.redoList.pop()
      if(dataUrl) {
        this.undoList.push(this.canvas.toDataURL());
        let img = new Image()
        img.src = dataUrl
        img.onload = () => {
          ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
          ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        }
      }
    }
  }
}


export default new CanvasState