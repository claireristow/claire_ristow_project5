import React from 'react';
import { Element } from 'react-scroll';

// Display each book in the to-read array as a Component. Each Component will have the book cover, the book title, the book author, a checkmark to move it to the completed list, and an X to remove it from the to-read list.
// create an alert before to confirm the user wants to delete a book
const ToReadDisplay = (props) => {
    return (
        <Element className="toReadList" name="toRead" spy={true} smooth={true} duration={500}>
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
        </Element>
    );
};

export default ToReadDisplay;