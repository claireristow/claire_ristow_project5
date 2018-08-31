import React, {Component} from 'react';

class BookSearchForm extends Component {
    constructor() {
        super();
        this.state = {
            bookTitle: ''
        }
    }
    // collect the user's search information
    getUserInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    // on submit, pass the user's search information through the runSearch function (api)
    // also set the book title state back to an empty string
    submitUserInput = (e) => {
        e.preventDefault();
        this.props.runSearch(this.state.book);
        this.setState({
            bookTitle: ''
        });
    }

    render() {
        return (
            <form>
                <label htmlFor="book">Search By Book Title or Author</label>
                <input onChange={this.getUserInput} type="text" id="book"/>
                <input onClick={this.submitUserInput} type="submit" value="Search"/>
            </form>
        )
    }
}

export default BookSearchForm;