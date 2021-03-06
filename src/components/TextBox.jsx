import React from 'react';

export default function TextBox(props) {
    const { addCard, textInput } = props; //получаем функцию добавления карточки и ссылку на текстэрия
    return (
            <form>
                <textarea ref={ textInput } placeholder='It was a dark and stormy night...'>
                </textarea>
                <button className='send-button material-icons' onClick={ (e) => addCard(e) }>send</button>
            </form>
    )
}
