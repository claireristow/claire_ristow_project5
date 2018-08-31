import React from 'react';

const ToReadDisplay = (props) => {
    console.log(props);
    return (
        <section className="toReadList">
            <h2>My To Read List</h2>
            {Object.keys(props.toReadList).map((key) => {
                return ( props.toReadList[key].remove === false ?
                    <div className="card" key={key}>
                        <h3>{props.toReadList[key].bookTitle}</h3>
                        <h4>{props.toReadList[key].bookAuthor}</h4>
                        <img src={props.toReadList[key].bookCover} alt={`book cover for ${props.toReadList[key].bookTitle}`} />
                        <button onClick={() => {props.removeFromToReadList(key)}} >Remove from list</button>
                    </div>
                    : null
                );
            })}
        </section>
    )
}

export default ToReadDisplay;