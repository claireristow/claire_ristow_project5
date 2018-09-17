import React from 'react';

// create an alert before to confirm the user wants to delete a book
const ToReadDisplay = (props) => {
    return (
        <section className="toReadList" id="toRead">
            <h2>My To-Read List</h2>
            <div className="listFlex">
                {Object.keys(props.toReadList).map((key) => {
                    return (
                        <div className="card" key={key}>
                        <div className="bookCover">
                            <img src={props.toReadList[key].bookCover} alt={`book cover for ${props.toReadList[key].bookTitle}`} />
                        </div>
                            <div className="displayContent">
                                <h3>{props.toReadList[key].bookTitle}</h3>
                                <div className="authorFlex">
                                    <h4>By: {props.toReadList[key].bookAuthor}</h4>
                                    <i className="fab fa-goodreads"></i>
                                </div>
                                <button onClick={() => { window.confirm('Are you sure you want to delete this book from your list?') === true ? props.removeFromToReadList(key) : null }} >Delete</button>
                                <button onClick={() => {props.moveToFinished(key), props.removeFromToReadList(key)}}>Finished</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    );
};

export default ToReadDisplay;