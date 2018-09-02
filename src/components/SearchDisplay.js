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
                            <div className="displayFlex">
                                <img src={bookObject.best_book.image_url} alt={`book cover for ${bookObject.best_book.title}`}/>
                                <div className="displayContent">
                                    <h4>By: {bookObject.best_book.author.name}</h4>
                                    <button onClick={() => { props.addToRead(bookObject) }}><i className="fas fa-plus"></i></button>
                                    <button onClick={() => { props.addFinished(bookObject) }}><i className="fas fa-check"></i></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}


export default SearchDisplay; 