
import axios from "axios";

export const usePlants = () => ({
    getplants: async() => {
        const response = await axios.get('http://localhost:3333/getPlants')
        console.log(response.data)

        return {
            plants: response.data.data
        }
    },
    getEdiblePlants: async() => {
        const response = await axios.get(`http://localhost:3333/getEdiblePlants`)
        return {
            plants: response.data.data
        }
    },
    getRedFlowers: async() => {
        const response = await axios.get(`http://localhost:3333/getRedFlowers`)
        return {
            plants: response.data.data
        }
    },
    getYellowFlowers: async() => {
        const response = await axios.get(`http://localhost:3333/getYellowFlowers`)
        return {
            plants: response.data.data
        }
    },
})