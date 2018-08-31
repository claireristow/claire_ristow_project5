import React from 'react';

const FinishedDisplay = (props) => {
    return (
        <section className="finishedList">
            <h2>My Finished Books List</h2>
            {Object.keys(props.finishedList).map((key) => {
                return ( props.finishedList[key].remove === false ?
                    <div className="card" key={key}>
                        <h3>{props.finishedList[key].bookTitle}</h3>
                        <h4>{props.finishedList[key].bookAuthor}</h4>
                        <img src={props.finishedList[key].bookCover} alt={`book cover for ${props.finishedList[key].bookTitle}`} />
                        <button onClick={() => {props.removeFromFinishedList(key)}}>Remove from list</button>
                    </div>
                    : null
                );
            })}
        </section>
    )
}

export default FinishedDisplay;