import React, {Component} from 'react';

class BookSearch extends Component {
    constructor() {
        super();
        this.state = {
            bookTitle: '',
            // bookAuthor: ''
        }
    }
    getUserInput = (e) => {
        // const userInput = document.getElementById('bookTitle').val();
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    submitUserInput = (e) => {
        console.log(this.state.bookTitle)
        e.preventDefault();
        this.props.runSearch(this.state.bookTitle);
        this.setState({
            bookTitle: '',
            // bookAuthor: ''
        });
    }

    render() {
        return (
            <div className="searchBy">
                <form>
                    <label htmlFor="bookTitle">Search By Book Title</label>
                    <input onChange={this.getUserInput} type="text" id="bookTitle"/>
                    <input onClick={this.submitUserInput} type="submit" value="Search"/>
                    {/* onClick={this.submitUserInput(this.getUserInput())} */}
                </form>
                {/* <form>
                    <label htmlFor="bookAuthor">Search By Book Author</label>
                    <input onChange={this.userInput} type="text" id="bookAuthor" value={this.state.bookAuthor} />
                    <input type="submit" value="Search"/>
                </form> */}
            </div>
        )
    }
}

export default BookSearch;