import Canvas from "./components/Canvas"
import SettingBar from "./components/SettingBar"
import Toolbar from "./components/Toolbar"
import "./style/app.scss"

function App() {

  return (
    <div className='app'>
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
  )
}

export default App
