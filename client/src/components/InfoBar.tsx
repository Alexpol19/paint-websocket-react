import canvasState from "../store/canvasState"
import infoState from "../store/infoState"
import { v4 as uuidv4 } from 'uuid';
import "../style/infobar.scss"
import { observer } from "mobx-react-lite";

const InfoBar = observer(() => (
    <div className="info-bar">
      <h3>Session Info</h3>
      <p><b>SessionId:</b> {canvasState.sessionId}</p>
      <h4>Connected users:</h4>
      <ul>
        <li><b>{canvasState.userName}</b> (you)</li>
        {infoState.connectedUsers.map(userName => (
          <li key={uuidv4()}><b>{userName}</b></li>
        ))}
      </ul>
    </div>
  )
)

export default InfoBar
