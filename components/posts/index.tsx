import {message} from "antd";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GetAllPosts} from "@/services/api/post";

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

        GetAllPosts().then(async data => {
            setLoading(false)

            if (data.successful) {
                setPosts(prv => data.content ?? prv)
            }
            else {
                messageApi.error({
                    content: data.title.optional('امکان نمایش پست ها وجود ندارد')
                })
            }
        })

    }
    return(
        <>
        </>
    )
}


export default Posts