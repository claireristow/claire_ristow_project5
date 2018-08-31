import React, {Component} from 'react';

// Display each book in the complete-books array as a Component. Each Component will have the book cover, book title, book author, and a 5-star rating. The 5 stars are note filled out until the user clicks the number of starts the want to rank the book.
// create an alert before to confirm the user wants to delete a book
class FinishedDisplay extends Component {
    // fills in the stars when a user rates a finished book
    starFill = (num, key) => {
        const starNum = parseInt(num);
        for (let i = starNum; i > 0; i--) {
            document.querySelector(`.${key} .star-${i}`).classList.add('starFill');
        }
        this.props.updateRating(starNum, key);
    }
    render() {
        return (
            <section className="finishedList">
                <h2>My Finished Books List</h2>
                {Object.keys(this.props.finishedList).map((key) => {
                    return (
                        <div className={`card ${key}`} key={key}>
                            <h3>{this.props.finishedList[key].bookTitle}</h3>
                            <h4>{this.props.finishedList[key].bookAuthor}</h4>
                            <img src={this.props.finishedList[key].bookCover} alt={`book cover for ${this.props.finishedList[key].bookTitle}`} />
                            <div className="rating">
                                <i className="fas fa-star star-1" onClick={() => { this.starFill("1", key) }}></i>
                                <i className="fas fa-star star-2" onClick={() => { this.starFill("2", key) }}></i>
                                <i className="fas fa-star star-3" onClick={() => { this.starFill("3", key) }}></i>
                                <i className="fas fa-star star-4" onClick={() => { this.starFill("4", key) }}></i>
                                <i className="fas fa-star star-5" onClick={() => { this.starFill("5", key) }}></i>
                            </div>
                            <button onClick={() => { window.confirm('Are you sure you want to delete this book from your list?') === true ? this.props.removeFromFinishedList(key) : null}}>Remove from list</button>
                        </div>
                    );
                })}
            </section>
        )
    }
}

export default FinishedDisplay;