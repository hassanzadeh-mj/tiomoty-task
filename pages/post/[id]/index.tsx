import React, { useEffect, useState} from "react";
import axiosClient from "@/services/axios";
import {useRouter} from "next/router";
import {IPostsResponse} from "@/utils/post";
import {
    Col,
    Form, FormProps,
    List,
    message,
    Row,
    Skeleton,
    Space
} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import CustomModal from "@/components/modal";

const Post = () => {

    //region <<< useState >>>
    const router = useRouter()
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [post, setPost] = useState<Partial<IPostsResponse> | null>(null)
    const [data, setData] = useState([
        {
            title: 'MojtabaHassanzadeh',
            mobile: "09*************",
            description: 'web Developer'
        },
        {
            title: 'MojtabaHassanzadeh',
            mobile: "09*************",
            description: 'web Developer'
        },
        {
            title: 'MojtabaHassanzadeh',
            mobile: "09*************",
            description: 'web Developer'
        },
    ])

    const inputs = [
        {
            header: 'Information ',
            items: [
                {
                    item: {
                        label: 'fullName',
                        name: 'fullName',
                        rules: [
                            {
                                required: true,
                                message: `Name and surname are required!`
                            },
                            {
                                min: 6,
                                message: "At least 6 letters!",
                            }
                        ],
                    },
                    input: {placeholder: 'first name and last name ', style: {width: '100%'}},
                    type: 'Input',
                    span: 24,
                    sm: 12,
                },
                {
                    item: {
                        label: 'mobile ',
                        name: 'mobile',
                        // البته پترن برای شماره موبایل های ایرانی هست
                        rules: [{pattern: new RegExp('^(?:0|\\+98|0098|098)(9\\d{9})$'),message: "This number is not for Iran!"},
                            {required: true, message: 'Mobile is mandatory!'}],
                    },
                    input: {placeholder: '*********09', style: {width: '100%'}},
                    type: 'Input',
                    span: 24,
                    sm: 12,
                },
                {
                    item: {
                        label: 'description ',
                        name: 'description',
                        rules: [{required: true, message: 'description is mandatory!'}],
                    },
                    input: {placeholder: 'description', style: {width: '100%'}},
                    type: 'Input',
                    span: 24,
                    sm: 12,
                }
            ]
        }
    ]

//endregion

    //region <<< useEffect >>>

    useEffect(() => {
        if (!router.isReady) return

        axiosClient.get(`posts/${router.query.id}`).then((response) => {
            setPost(response.data)
            setLoading(false)
        }).catch(_ => {
            messageApi.error({
                content: 'امکان نمایش پست ها وجود ندارد'
            })
        });
    }, [router.isReady])

//endregion

    //region <<< function >>>

    const IconText = ({icon, text, onClick}: { icon: React.FC; text: string; onClick?: () => void }) => (
        <Space onClick={onClick} style={{cursor: 'pointer'}}>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    const onCancel = () => {
        setIsOpen(false)
        form.resetFields()
    }

    function onFinish(values: any) {
        setData(prv => ([...prv, {
            title: values.fullName,
            mobile: values.mobile,
            description: values.description
        }]))
        form.resetFields()
        setIsOpen(false)
        // این فانکشن برای گرفتن ولیو  اینپوت هاست
    }

    function onValuesChange(values: any) {
    // این فانکشن برای onChange Input هاست
    }

    const formProps: FormProps = {
        name: 'Form',
        form: form,
        layout: 'vertical',
        onFinish: onFinish,
        onValuesChange:onValuesChange
    }

    //endregion

    return (
        <main className={'baseContainer'}>
            {contextHolder}
            <Row justify={'center'} align={'middle'} gutter={[8, 0]}
                 style={{width: '100%', height: '100%', maxWidth: '992px'}}>
                <Col span={24} style={{width: '100%', height: '90%'}}>
                    <List itemLayout="vertical" header={<p className={'postTitle'}>{post?.title}</p>}
                          size="large" loading={loading}>
                        <List.Item
                            key={post?.id}
                            actions={[
                                <IconText icon={PlusOutlined} text="add comment"
                                          onClick={() => setIsOpen(!isOpen)} key={`icon-${post?.id}`}/>,
                            ]}>
                            <Row justify={'space-between'} align={'top'} gutter={16}>
                                <Col span={24} md={8}>
                                    <img
                                        width={'100%'}
                                        alt="logo"
                                        src={post?.image}
                                        style={{borderRadius: 4}}
                                    />
                                    <span className={'postTitle'}>userId :<p
                                        className={'description'}>{post?.userId}</p> </span>
                                    <span className={'postTitle'}>category :<p
                                        className={'description '}>{post?.category}</p> </span>
                                    <span className={'postTitle'}>publishedAt <p
                                        className={'description'}>:{post?.publishedAt}</p> </span>
                                    <span className={'postTitle'}>updatedAt :<p
                                        className={'description'}>{post?.updatedAt}</p> </span>
                                </Col>
                                <Col span={24} md={16}>
                                    <Skeleton loading={loading}/>
                                    <p className={'description marginDescription'}>{post?.status}</p>
                                    {post?.content}
                                </Col>
                            </Row>
                        </List.Item>
                    </List>
                    <List size="large"
                          key={`list-${post?.id}`}
                          loading={loading}
                          header={<p className={'postTitle'}>comments</p>}
                          pagination={false}
                          dataSource={data}
                          renderItem={(item) => (
                              <List.Item>
                                  <List.Item.Meta
                                      title={<p>{item.title}</p>}
                                      description={item.description}
                                  />
                              </List.Item>
                          )}/>
                </Col>
            </Row>
            <CustomModal isOpen={isOpen} inputs={inputs} formProps={formProps} onCancel={onCancel}/>
        </main>
    )
}

export default Post