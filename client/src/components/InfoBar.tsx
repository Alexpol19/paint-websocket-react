import canvasState from "../store/canvasState"
import infoState from "../store/infoState"
import { v4 as uuidv4 } from 'uuid';
import "../style/infobar.scss"
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { getSessions } from "../actions/api";
import { Link } from "react-router-dom";

const InfoBar = observer(() => {
  const otherSessions = infoState.sessions.filter(session => session !== canvasState.sessionId)

  useEffect(() => {
    getSessions()
      .then(response => {
        infoState.setSessions(response.data)
      })
  }, [])

  return (
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
      {otherSessions.length && (
        <>
          <h4>Other sessions:</h4>
          {otherSessions.map(session => (
            <p key={uuidv4()}><Link to={`/${session}`} reloadDocument>{session}</Link></p>
          ))}
        </>
      )}
    </div>
  )
})

export default InfoBar
