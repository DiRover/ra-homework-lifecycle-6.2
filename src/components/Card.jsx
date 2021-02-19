import React from 'react';

export default function Card(props) {
    const { item, deleteCard } = props; //получаем контент и функцию удаления карты
    return (
        <div className='card-box'>
            <div className='card-content'>
                { item.content } {/*прописываем контент */}
            </div>
            <button className='card-button material-icons red' onClick = { () => deleteCard(item.id) }>close</button>
        </div>
    )
}