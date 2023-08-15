import axiosClient from "@/services/axios";

export function Posts( ) {
    return axiosClient
        .get<any>("posts")
        .then(responseBody => ({
            ...responseBody.data,
            successful: true
        }))
        .catch(error => ({
            title: error.response?.data?.title ?? error.message,
            content: null,
            successful: false
        }))
}