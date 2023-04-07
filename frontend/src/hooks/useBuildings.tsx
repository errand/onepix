import useSWR from "swr";
import axios from "../lib/axios";
import {removeTrailingSlash} from "next/dist/shared/lib/router/utils/remove-trailing-slash";

export default function useBuildings(page, address) {
    console.log(address)
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
