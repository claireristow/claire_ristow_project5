import React, {Component} from 'react';

class BookSearchForm extends Component {
    constructor() {
        super();
        this.state = {
            bookTitle: ''
        }
    }
    getUserInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    submitUserInput = (e) => {
        console.log(this.book)
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