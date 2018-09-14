import React, {Component} from 'react';
import { Element } from 'react-scroll';

// Display each book in the complete-books array as a Component. Each Component will have the book cover, book title, book author, and a 5-star rating. The 5 stars are note filled out until the user clicks the number of starts the want to rank the book.
// create an alert before to confirm the user wants to delete a book
class FinishedDisplay extends Component {
    // fills in the stars when a user rates a finished book
    starFill = (num, key) => {
        const starNum = parseInt(num);
        const starFillArray = []
        // if user chooses to change the rating they previously left on a book
        if (document.querySelector(`.${key} .star${starNum}`).classList.contains('starFill')){
            console.log('contains!')
            document.querySelector(`.${key} .fa-star`).classList.remove('starFill');
        }
        for (let i = starNum; i > 0; i--) {
            document.querySelector(`.${key} .star${i}`).classList.add('starFill');
            // create an array of the i tags that have a class of starFill to send to updateRating
            starFillArray.push(`star${i}`)
        }
        this.props.updateRating(starFillArray, key);
    };
    render() {
        return (
            <Element className="finishedList" name="finished" spy={true} smooth={true} duration={500}>
                <h2>My Finished Books List</h2>
                <div className="listFlex">
                    {Object.keys(this.props.finishedList).map((key) => {
                        return (
                            <div className={`card ${key}`} key={key}>
                            <div className="bookCover">
                                <img src={this.props.finishedList[key].bookCover} alt={`book cover for ${this.props.finishedList[key].bookTitle}`} />
                            </div>
                                <div className="displayContent">
                                    <h3>{this.props.finishedList[key].bookTitle}</h3>
                                    <div className="authorFlex">
                                        <h4>By: {this.props.finishedList[key].bookAuthor}</h4>
                                        <i className="fab fa-goodreads"></i>
                                    </div>
                                    <div className="rating">
                                        <i className="fas fa-star star1" onClick={() => this.starFill("1", key) }></i>
                                        <i className="fas fa-star star2" onClick={() => this.starFill("2", key) }></i>
                                        <i className="fas fa-star star3" onClick={() => this.starFill("3", key) }></i>
                                        <i className="fas fa-star star4" onClick={() => this.starFill("4", key) }></i>
                                        <i className="fas fa-star star5" onClick={() => this.starFill("5", key) }></i>
                                    </div>
                                    <button onClick={() => { window.confirm('Are you sure you want to delete this book from your list?') === true ? this.props.removeFromFinishedList(key) : null }}>Delete</button>
                                </div>
                            </div>
                    );    
                })}
                </div>
            </Element>
        );
    };
};

export default FinishedDisplay;