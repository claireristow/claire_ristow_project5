import React, {Component} from 'react';

// Display the results from the api search
class SearchDisplay extends Component {
    checkTitleLength = (bookObject) => {
        let shortenedTitle = '';
        if (bookObject.best_book.title.length > 35) {
            shortenedTitle = bookObject.best_book.title.slice(0, 34) + '...'
        } else {
            shortenedTitle = bookObject.best_book.title;
        }
        return shortenedTitle;
    };
    render() {
        return (
            <div className="resultsFlex">
                {this.props.getSearchInfo.map((bookObject, i) => {
                    return (
                        <div className="card" key={i} spy={true} smooth={true} duration={500}>
                            <img src={bookObject.best_book.image_url} alt={`book cover for ${bookObject.best_book.title}`}/>
                            <div className="displayContent">
                                <h3>{this.checkTitleLength(bookObject)}</h3>
                                <h4>By: {bookObject.best_book.author.name}</h4>
                                <button onClick={() => { this.props.addToRead(bookObject) }}><i className="fas fa-plus"></i>     To-Read</button>
                                <button onClick={() => { this.props.addFinished(bookObject) }}><i className="fas fa-check"></i>  Finished</button>
                                <i className="fab fa-goodreads"></i>
                            </div>
                        </div>
                    )
                })}
            </div>
        ); // en of return
    }; // end of render
}; // end of component


export default SearchDisplay; 