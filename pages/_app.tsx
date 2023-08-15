import React, {useState} from 'react';
import {Col, ConfigProvider, Row, Spin} from 'antd';
import type {AppProps} from 'next/app';
import theme from './themeConfig';
import '@/styles/globals.css'
import {Router} from "next/router";

const App = ({Component, pageProps}: AppProps) => {
    const [loading, setloading] = useState(false)
    Router.events.on('routeChangeStart', (url) => {
        setloading(true)
    })
    Router.events.on("routeChangeComplete", (url) => {
        setloading(false)
    })
    return (
        <ConfigProvider theme={theme}>
            {loading
                ? <main style={{
                    width: '100%', height: '100vh', overflowY: 'scroll', overflowX: 'hidden'
                    , display: 'flex', justifyContent: 'center'
                }}>
                    <Row justify={'center'} align={'middle'} gutter={[8, 0]}
                         style={{width: '100%', height: '100%', maxWidth: '992px'}}>
                        <Col>
                            <Spin size={'large'} style={{color: '#888'}}/>
                        </Col>
                        <Col>
                            <p style={{zIndex: 2, color: '#888'}}> please wait a moment ... </p>
                        </Col>
                    </Row>
                </main>
                : <><Component {...pageProps} /></>
            }
        </ConfigProvider>
    );
}
export default App;