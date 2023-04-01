import useSWR from 'swr'
import axios from '../lib/axios'

export const useFetcher = ()  => {

    const { data: buildings, error, mutate } = useSWR('/api/buildings', () =>
        axios
            .get('/api/buildings')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    const buildingMetro = async ({ ...props }) => {
        axios
            .get(`/api/buildings/${props.id}/metro`)
            .then((data) => console.log(data))
            .catch(error => {
                if (error.response.status !== 422) throw error
            })
    }

    return {
        buildings,
        buildingMetro
    }
}
