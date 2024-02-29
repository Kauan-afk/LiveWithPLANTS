
import axios from "axios";

export const usePlants = () => ({
    getplants: async() => {
        const response = await axios.get('https://live-with-plants-backend.vercel.app/getPlants')
        console.log(response.data)

        return {
            plants: response.data.data
        }
    },
    getEdiblePlants: async() => {
        const response = await axios.get(`https://live-with-plants-backend.vercel.app/getEdiblePlants`)
        return {
            plants: response.data.data
        }
    },
    getRedFlowers: async() => {
        const response = await axios.get(`https://live-with-plants-backend.vercel.app/getRedFlowers`)
        return {
            plants: response.data.data
        }
    },
    getYellowFlowers: async() => {
        const response = await axios.get(`https://live-with-plants-backend.vercel.app/getYellowFlowers`)
        return {
            plants: response.data.data
        }
    },
})