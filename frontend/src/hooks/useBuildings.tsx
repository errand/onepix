import useSWR from "swr";
import axios from "../lib/axios";

export default function useBuildings(page, address) {
    // @ts-ignore
    const { data, error, isLoading } = useSWR([`/api/buildings?page=${page}`, address],() => axios
        .get(`/api/buildings${address}`)
        .then(res => res.data)
        .catch(error => {
            if (error.response.status !== 409) throw error
        }));
    return {
        buildings: data,
        isLoading,
        isError: error
    }
}
