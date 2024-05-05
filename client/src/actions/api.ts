import axios from "axios"

export const sendImage = (canvas: HTMLCanvasElement, id: string) => {
  axios.post(`http://localhost:3000/image?id=${id}`, {img: canvas.toDataURL()})
    .then(response => console.log(response.data))
}

export const getImage = (id: string) => axios.get(`http://localhost:3000/image?id=${id}`)
