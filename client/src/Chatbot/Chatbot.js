import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import Message from './Sections/Message';



const urluser = 'http://localhost:5000/user'
const url = "http://localhost:5000/api/dialogflow"
function Chatbot() {
    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)

    useEffect(() => {

        eventQuery('welcomeuser')

    }, [])


    const textQuery = async (text) => {

        //  users message     
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }
        dispatch(saveMessage(conversation))
        

        const msg = { text : text}
        fetch(urluser , {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(msg)
        }).then(() => {
            console.log('message updated in backend')
        })


        // message from chatbot
        const textQueryVariables = {
            text
        }
        try {
            //sending request to the textQuery ROUTE 
            const response = await Axios.post(`${url}/textQuery`, textQueryVariables)

            for (let content of response.data.fulfillmentMessages) {

                conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }

            dispatch(saveMessage(conversation))


        }

    }


    const eventQuery = async (event) => {

        // We need to take care of the message Chatbot sent 
        const eventQueryVariables = {
            event
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post(`${url}/eventQuery`, eventQueryVariables)
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }

    }


    const keyPressHanlder = (e) => {
        if (e.key === "Enter") {

            if (!e.target.value) {
                return alert('you need to type somthing first')
            }

            //we will send request to text query route 
            textQuery(e.target.value)


            e.target.value = "";
        }
    }

    

    const renderOneMessage = (message, i) => {
        console.log('message', message)

        if (message.content && message.content.text && message.content.text.text) {
            return <Message key={i} who={message.who} text={message.content.text.text} />
        } 

    }

    const renderMessage = (returnedMessages) => {

        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }


    return (
        <div style={{
            backgroundColor: '#ffd870',
            height: 700, width: 700,
            border: '3px solid black', borderRadius: '10px'
        }}>
           
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>
                {renderMessage(messagesFromRedux)}
            </div>
            <input
                style={{
                    margin: 0, width: '100%', height: 50,
                    borderRadius: '5px', padding: '5px', fontSize: '1rem'
                }}
                placeholder="Send a message..."
                onKeyPress={keyPressHanlder}
                type="sumbit"
            />

        </div>
    )
}

export default Chatbot;
