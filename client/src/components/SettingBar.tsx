import toolState from "../store/toolState"
import "../style/toolbar.scss"

const SettingBar = () => (
  <div className="setting-bar">
    <label htmlFor="line-width">Line width</label>
    <input
      id="line-width"
      type="number"
      defaultValue={1}
      min={1}
      max={50}
      style={{margin: '0 10px'}}
      onChange={e => toolState.setLineWidth(+e.target.value)}
    />
    <label htmlFor="stroke-color">Stroke color</label>
    <input onChange={e => toolState.setStrokeColor(e.target.value)} id="stroke-color" type="color"/>
  </div>
)

export default SettingBar
