import React from 'react';

// Display the results from the api search
const SearchDisplay = (props) => {
    return (
        <div className="resultsFlex">
            {props.getSearchInfo.map((bookObject, i) => {
                return (
                    <div className="card" key={i} spy={true} smooth={true} duration={500}>
                        <img src={bookObject.best_book.image_url} alt={`book cover for ${bookObject.best_book.title}`}/>
                        <div className="displayContent">
                            <h3>{bookObject.best_book.title}</h3>
                            <h4>By: {bookObject.best_book.author.name}</h4>
                            <button onClick={() => { props.addToRead(bookObject) }}><i className="fas fa-plus"></i>     To-Read</button>
                            <button onClick={() => { props.addFinished(bookObject) }}><i className="fas fa-check"></i>  Finished</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default SearchDisplay; 