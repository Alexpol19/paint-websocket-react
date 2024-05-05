import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Canvas from "./components/Canvas"
import SettingBar from "./components/SettingBar"
import Toolbar from "./components/Toolbar"
import "./style/app.scss"
import InfoBar from "./components/InfoBar"

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/:sessionId" element={
        <div className='app'>
        <Toolbar />
        <SettingBar />
        <Canvas />
        <InfoBar />
      </div>
      } />
      <Route
        path="*"
        element={<Navigate to={`f${(+new Date).toString(16)}`} replace />}
      />
    </Routes>
  </BrowserRouter>
)

export default App
