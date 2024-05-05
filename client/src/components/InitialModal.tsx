import { useRef, useState } from "react"
import canvasState from "../store/canvasState"
import { Button, Modal } from "react-bootstrap"

const InitialModal = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const [modal, setModal] = useState(true)

  const connectHandler = () => {
    if(usernameRef.current){
      canvasState.setUsername(usernameRef.current.value)
      setModal(false)
    }
  }

  return (
    <Modal show={modal} onHide={() => {}}>
      <Modal.Header >
        <Modal.Title>Enter your name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" ref={usernameRef}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => connectHandler()}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InitialModal
