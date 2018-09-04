import React, {Component} from 'react';
import { Element } from 'react-scroll';

class BookSearchForm extends Component {
    constructor() {
        super();
        this.state = {
            bookTitle: ''
        };
    };
    // collect the user's search information
    getUserInput = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    // on submit, pass the user's search information through the runSearch function (api)
    // also set the book title state back to an empty string
    submitUserInput = (e) => {
        e.preventDefault();
        this.props.runSearch(this.state.book);
        this.setState({
            bookTitle: ''
        });
    };
    render() {
        return (
            <Element className="searchResults wrapper" name="bookSearch">
                <h2>Book Search</h2>
                <form>
                    <label htmlFor="book">Search By Book Title or Author</label>
                    <div className="formFlex">
                        <input onChange={this.getUserInput} type="text" id="book"/>
                        <input onClick={this.submitUserInput} type="submit" value="Search"/>
                    </div>
                </form>
            </Element>
        );
    };
};

export default BookSearchForm;