// import { List } from 'actions-on-google'
import React from 'react'
import { List } from 'antd';


function Message(props) {

    

    return (
        <List.Item style={{ padding: '1rem' }}>
            <List.Item.Meta
                avatar={ props.who === 'bot'  ? <img src='https://media.istockphoto.com/vectors/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-stock-vector-id1250000899?k=6&m=1250000899&s=170667a&w=0&h=UQMQzR6XGMsrICYl_SvhKqw9dTHYBZ1DIsPCm46cTo4=' alt="Avatar" className='left' /> : <img src='https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png' alt="Avatar" className='right' /> }
                description={<div
                    style={ {
                        marginTop: "10px",
                        backgroundColor: "#FBBF24",
                        color: "#374151",
                        borderRadius: "20px",
                        padding: "0.5rem 1.5rem",
                        fontSize: "18px",

                    }}
                 >  
                    {props.text}
                </div>}
            />
        </List.Item>
    )
}

  

export default Message
