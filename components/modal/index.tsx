import {Col, Form, FormProps, Input, Modal, Row} from "antd";
import React, {Fragment} from "react";
import Button from "@/components/btn/button";

interface IProps {
    isOpen:boolean
    onCancel:()=>void
    inputs:any[]
    formProps:FormProps
}

const CustomModal:React.FC<IProps> = (props) => {
  return(
      <Modal open={props.isOpen} onCancel={props.onCancel} footer={false} width={650}>
          <Form {...props.formProps}>
              <Row gutter={[8, 8]} justify={'start'} align={'bottom'}>
                  {
                      props.inputs?.map((e, i) => {
                          return (
                              <Fragment key={'input-' + i}>
                                  {<Col span={24}>{e.header}</Col>}
                                  {e.items?.map((b:any) =>
                                      <Col span={b.span} sm={b.sm} key={b.item.name}>
                                          <Form.Item {...b.item}>
                                              <Input placeholder={b.input.placeholder} allowClear/>
                                          </Form.Item>
                                      </Col>
                                  )}
                              </Fragment>)
                      })}
                  <Col span={24}>
                      <Row gutter={[8, 8]} justify={'start'} style={{padding: '24px 0'}}>
                          <Col span={20} sm={10}>
                              <Button htmlType={'submit'}
                                      type={'primary'}
                                      title={'Register comment'}/>
                          </Col>
                          <Col span={10} sm={8}>
                              <Button onClick={props.onCancel} title={'coming back'}/>
                          </Col>
                      </Row>
                  </Col>
              </Row>
          </Form>
      </Modal>

  )

}
export default  CustomModal