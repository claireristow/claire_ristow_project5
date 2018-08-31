import React from 'react';

// Display the results from the api search
const SearchDisplay = (props) => {
    return (
        <section className="searchResults wrapper">
            <h2>Search Results</h2>
            <div className="resultsFlex">
                {props.getSearchInfo.map((bookObject, i) => {
                    return (
                        <div className="card" key={i}>
                            <h3>{bookObject.best_book.title}</h3>
                            <h4>{bookObject.best_book.author.name}</h4>
                            <img src={bookObject.best_book.image_url} alt={`book cover for ${bookObject.best_book.title}`}/>
                            <button onClick={() => {props.addToRead(bookObject)}}>To-Read</button>
                            <button onClick={() => {props.addFinished(bookObject)}}>Finished</button>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}


export default SearchDisplay; 