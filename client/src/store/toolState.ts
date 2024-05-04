import { makeAutoObservable } from "mobx";

class ToolState {
  tool: any | null = null
  strokeColor: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  setTool(tool: any) {
    this.tool = tool
    this.tool.strokeColor = this.strokeColor
  }

  setFillColor(color: string) {
    this.tool.fillColor = color
  }
  
  setStrokeColor(color: string) {
    this.strokeColor = color
    this.tool.strokeColor = this.strokeColor
  }
  
  setLineWidth(width: number) {
    this.tool.lineWidth = width
  }
}

export default new ToolState
