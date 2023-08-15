import React from "react";
import {Button as AntdButton, ButtonProps} from 'antd'

interface IProps extends ButtonProps {
}


const Button: React.FC<IProps> = (props) => {
    const prop = {
        ...props,
        style: {
            width: "100%",
            ...props.style,
        }
    }

    return (
        <AntdButton {...prop}>
            {props.children ?? props.title}
        </AntdButton>
    )
}
export default Button