import React, { useEffect, useState } from 'react';
import Card from './Card';
import TextBox from './TextBox';
//const url = 'http://localhost:7070/notes';
const url = 'https://unionserver.herokuapp.com/notes';



export default function Crud(props) {
    const [state, setState] = useState([]); //стейт для отображения карточек
    const [request, setMethod] = useState({requestMethod: 'GET', requestBody: ''}); //стейт для выпонления запросов
    let textInput = React.createRef(); //ссылка для управления содержимым текстэриа
    useEffect(() => { //хук для обработки жизненных циклов компонента
        async function fetchData() {
            let response; //переменная для хранения ответа сервера
            const text = request.requestBody; //запиывем текст из стейта (необязательно)
            const obj = { content: text }; //создаём объект для передачи на бэк (необяхательно, можно напрямую)
            if (request.requestMethod === 'GET') { //получаем карточки после загрузки страницы
                response = await fetch(url, {
                    method: request.requestMethod,
                });
            } else if (request.requestMethod === 'POST') { //постим карточку на сервер
                response = await fetch(url, { //объявление функции
                    method: request.requestMethod, //метод
                    headers: { //нужно обязательно прописать!!! иначе сервер неправильно парсит
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj) //тело запроса с контентом на сервер
                });
                response = await fetch(url, { method: 'GET' }); //обновляем список карточек на странице
            } else {
                response = await fetch(`${url}/${request.requestBody}`, { //удаляем карточку с сервера
                    method: request.requestMethod,
                });
                response = await fetch(url, { method: 'GET' }); //обновляем список карточек на странице
            }
            const result = await response.json(); //записываем результат
            setState(result);
        }
        fetchData(); //выполнение функции
    }, [request]); //по данному параметру (стейту) хук юзэффект понимает как именно жизненный цикл у компонента, если изменился то рендерит

    const refreshList = (e) => { //простое обновление списка
        e.preventDefault();
        setMethod((prevMethod) => {
            return {requestMethod: 'GET', requestBody: ''}
        });
    }

    const addCard = (e) => { //добавление карточки
        e.preventDefault();
        const content = textInput.current.value; //получаем значение через ref
        textInput.current.value = ''; //очищаем поле ввода, только после такой комбинации получается чистка
        setMethod(() => {
            return {requestMethod: 'POST', requestBody: content} //постим на сервер
        });
    }

    const deleteCard = (id) => { //удаление карточки
        setMethod((prevMethod) => {
            return {requestMethod: 'DELETE', requestBody: id} //передаём на сервер айди карточки для удаления
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
