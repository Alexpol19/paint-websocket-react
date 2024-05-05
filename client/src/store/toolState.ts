import { makeAutoObservable } from "mobx";

class ToolState {
  tool: any | null = null
  strokeColor: string = ''
  fillColor: string = ''
  lineWidth: number = 1

  constructor() {
    makeAutoObservable(this)
  }

  setTool(tool: any) {
    this.tool = tool
    this.tool.strokeColor = this.strokeColor
    this.tool.fillColor = this.fillColor
    this.tool.lineWidth = this.lineWidth
  }

  setFillColor(color: string) {
    this.fillColor = color
    this.tool.fillColor = color
  }
  
  setStrokeColor(color: string) {
    this.strokeColor = color
    this.tool.strokeColor = this.strokeColor
  }
  
  setLineWidth(width: number) {
    this.lineWidth = width;
    this.tool.lineWidth = width
  }
}

export default new ToolState
