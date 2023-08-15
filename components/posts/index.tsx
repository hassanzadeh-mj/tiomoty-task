import {message} from "antd";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
interface IPostsResponse {

}
const Posts = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [posts,setPosts] =useState<IPostsResponse | null>(null)
    const router = useRouter()

    const [loading, setLoading] = useState(false);

    const [request, setRequest] = useState<any>(null);


    useEffect(() => {
        search()
        setInterval(() => {
            search()
        }, 10000);

    }, [request])


    function search() {
        setLoading(true)


    }
    return(
        <>
        </>
    )
}


export default Posts