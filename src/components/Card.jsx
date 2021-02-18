import React from 'react';

export default function Card(props) {
    const { item, deleteCard } = props;
    return (
        <div className='card-box'>
            <div className='card-content'>
                { item.content }
            </div>
            <button className='card-button material-icons red' onClick = { () => deleteCard(item.id) }>close</button>
        </div>
    )
}