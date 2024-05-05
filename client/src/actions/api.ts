import axios from "axios"

export const sendImage = (canvas: HTMLCanvasElement, sessionId: string) => {
  axios.post(`http://localhost:3000/image?id=${sessionId}`, {img: canvas.toDataURL()})
    .then(response => console.log(response.data))
}

export const getImage = (sessionId: string) => axios.get(`http://localhost:3000/image?id=${sessionId}`)
