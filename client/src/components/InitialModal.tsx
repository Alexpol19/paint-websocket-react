import { ChangeEvent, KeyboardEvent, useState } from "react"
import canvasState from "../store/canvasState"
import { Button, Modal } from "react-bootstrap"
import "../style/initialModal.scss"

const InitialModal = () => {
  const [modal, setModal] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [value, setValue] = useState('')

  const connectHandler = () => {
    if(value.length){
      canvasState.setUsername(value)
      setModal(false)
    } else {
      setErrorMessage('Please enter your name before continue')
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') connectHandler()
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setErrorMessage('');
  }

  return (
    <Modal
      show={modal}
      onHide={() => {}}
      className="initial-modal"
    >
      <Modal.Header >
        <Modal.Title>Enter your name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          autoFocus
          type="text"
          onChange={handleInputChange}
          value={value}
          onKeyDown={handleKeyDown}
          required
          className={errorMessage ? 'error' : ''}
        />
        {errorMessage && (
          <p className={`error-text ${errorMessage ? 'show' : ''}`}>{errorMessage}</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={() => connectHandler()}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InitialModal
