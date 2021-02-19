import React, { useEffect, useState } from 'react';
import Card from './Card';
import TextBox from './TextBox';
//const url = 'http://localhost:7777/notes';
const url = 'https://lifecycle-server.herokuapp.com/notes';


export default function Crud(props) {
    const [state, setState] = useState([]);
    const [request, setMethod] = useState({requestMethod: 'GET', requestBody: ''});
    let textInput = React.createRef();
    useEffect(() => {
        async function fetchData() {
            let response;
            const text = request.requestBody;
            const obj = { content: text };
            if (request.requestMethod === 'GET') {
                response = await fetch(url, {
                    method: request.requestMethod,
                });
            } else if (request.requestMethod === 'POST') {
                response = await fetch(url, {
                    method: request.requestMethod,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj)
                });
                response = await fetch(url, { method: 'GET' });
            } else {
                response = await fetch(`${url}/${request.requestBody}`, {
                    method: request.requestMethod,
                });
                response = await fetch(url, { method: 'GET' });
            }
            const result = await response.json();
            setState(result);
        }
        fetchData();
    }, [request]);

    
    console.log(state);

    const refreshList = (e) => {
        e.preventDefault();
        setMethod((prevMethod) => {
            return {requestMethod: 'GET', requestBody: ''}
        });
    }

    const addCard = (e) => {
        e.preventDefault();
        const content = textInput.current.value;
        textInput.current.value = '';
        setMethod(() => {
            return {requestMethod: 'POST', requestBody: content}
        });
    }

    const deleteCard = (id) => {
        setMethod((prevMethod) => {
            return {requestMethod: 'DELETE', requestBody: id}
        })
    }
    return (
        <div>
            <h2>GRUD</h2>
            <button className='refresh-button material-icons green' onClick = { refreshList }>autorenew</button>
            <div className = 'cards-container'>
                { state.map((item) => <Card item = { item } deleteCard = { deleteCard } key = { item.id } />)}
            </div>
            <TextBox addCard = { addCard } textInput = { textInput } />
        </div>
    )
};
