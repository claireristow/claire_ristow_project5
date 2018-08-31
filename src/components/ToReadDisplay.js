import React from 'react';

// Display each book in the to-read array as a Component. Each Component will have the book cover, the book title, the book author, a checkmark to move it to the completed list, and an X to remove it from the to-read list.
// create an alert before to confirm the user wants to delete a book
const ToReadDisplay = (props) => {
    return (
        <section className="toReadList">
            <h2>My To Read List</h2>
            {Object.keys(props.toReadList).map((key) => {
                return (
                    <div className="card" key={key}>
                        <h3>{props.toReadList[key].bookTitle}</h3>
                        <h4>{props.toReadList[key].bookAuthor}</h4>
                        <img src={props.toReadList[key].bookCover} alt={`book cover for ${props.toReadList[key].bookTitle}`} />
                        <button onClick={() => { window.confirm('Are you sure you want to delete this book from your list?') === true ? props.removeFromToReadList(key) : null}} >Remove from list</button>
                    </div>
                );
            })}
        </section>
    )
}

export default ToReadDisplay;