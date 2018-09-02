import React, {Component} from 'react';

// Display each book in the complete-books array as a Component. Each Component will have the book cover, book title, book author, and a 5-star rating. The 5 stars are note filled out until the user clicks the number of starts the want to rank the book.
// create an alert before to confirm the user wants to delete a book
class FinishedDisplay extends Component {
    // fills in the stars when a user rates a finished book
    starFill = (num, key) => {
        const starNum = parseInt(num);
        const starFillArray = []
        for (let i = starNum; i > 0; i--) {
            document.querySelector(`.${key} .star${i}`).classList.add('starFill');
            // create an array of the i tags that have a class of starFill to send to updateRating
            starFillArray.push(`star${i}`)
        }
        console.log(starFillArray)
        this.props.updateRating(starFillArray, key);
    }
    // add the starFill class on specified rating stars if this.state.finishedList books have a rating greater than 0
    // checkStarFillClass = (finishedList) => {
    //     Object.keys(finishedList).map((key) => {
    //         if (finishedList[key].rating.length > 0) {
    //             const needsClass = finishedList[key].rating
    //             needsClass.map((starClass) => {
    //                 if (document.querySelector(`.${key} .${starClass}`).classList.contains('starFill')) {
    //                     null
    //                 } else {
    //                 document.querySelector(`.${key} .${starClass}`).classList.add('starFill');
    //                 }
    //             })
    //         } else {
    //             console.log("it's not working")
    //         }
    //     })
    // }
    render() {
        return (
            <section className="finishedList">
                <h2>My Finished Books List</h2>
                <div className="listFlex">
                    {Object.keys(this.props.finishedList).map((key) => {
                        return (
                            <div className={`card ${key}`} key={key}>
                                <h3>{this.props.finishedList[key].bookTitle}</h3>
                                <div className="displayFlex">
                                    <img src={this.props.finishedList[key].bookCover} alt={`book cover for ${this.props.finishedList[key].bookTitle}`} />
                                    <div className="displayContent">
                                        <h4>By: {this.props.finishedList[key].bookAuthor}</h4>
                                        <div className="rating">
                                            <i className="fas fa-star star1" onClick={() => { this.starFill("1", key) }}></i>
                                            <i className="fas fa-star star2" onClick={() => { this.starFill("2", key) }}></i>
                                            <i className="fas fa-star star3" onClick={() => { this.starFill("3", key) }}></i>
                                            <i className="fas fa-star star4" onClick={() => { this.starFill("4", key) }}></i>
                                            <i className="fas fa-star star5" onClick={() => { this.starFill("5", key) }}></i>
                                        </div>
                                        {/* {this.checkStarFillClass(this.props.finishedList)} */}
                                        <button onClick={() => { window.confirm('Are you sure you want to delete this book from your list?') === true ? this.props.removeFromFinishedList(key) : null }}><i className="fas fa-times"></i></button>
                                        <i className="fab fa-goodreads"></i>
                                    </div>
                                </div>
                            </div>
                    );    
                })}
                </div>
            </section>
        )
    }
}

export default FinishedDisplay;