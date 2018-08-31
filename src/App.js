import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';
import firebase from './firebase';

//COMPONENTS
import BookSearchForm from './components/BookSearchForm';
import SearchDisplay from './components/SearchDisplay';
import ToReadDisplay from './components/ToReadDisplay';
import FinishedDisplay from './components/FinishedDisplay';

//CONSTANTS
const toReadListRef = firebase.database().ref('/toReadList');
const finishedListRef = firebase.database().ref('/finishedList');

class App extends Component {
  constructor() {
    super();
    // Create empty arrays to store the search results, to-read list, and finished list
    this.state = {
      searchResults: [],
      toReadList: [],
      finishedList: []
    }
  }
  runSearch = (query) => {
    axios({
      method: 'GET',
      url: 'https://proxy.hackeryou.com',
      //OR url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: "https://www.goodreads.com/search.xml",
        params: {
          'key': "wzahGILEJsuTlYRpoLoEw",
          'q': query
        },
        xmlToJSON: true,
        useCache: false
      }
    }).then((res) => {
      const targetedResults = res.data.GoodreadsResponse.search.results.work
      this.setState({
        searchResults: targetedResults
      })
    })
  }
  addToRead = (bookObject) => {
    toReadListRef.push({
      booktitle: bookObject.best_book.title,
      bookAuthor: bookObject.best_book.author.name,
      bookCover: bookObject.best_book.image_url,
      removed: false
    })
  }
  addFinished = (bookObject) => {
    finishedListRef.push({
      booktitle: bookObject.best_book.title,
      bookAuthor: bookObject.best_book.author.name,
      bookCover: bookObject.best_book.image_url,
      removed: false
    })
  }
  removeFromToReadList = (key) => {
    toReadListRef.child(`${key}`).update({remove: true});
  }
  removeFromFinishedList = (key) => {
    finishedListRef.child(`${key}`).update({remove: true});
  }
  componentDidMount() {
    toReadListRef.on('value', (snapshot) => {
      this.setState({
        toReadList: snapshot.val()
      })
    })
    finishedListRef.on('value', (snapshot) => {
      this.setState({
        finishedList: snapshot.val()
      })
    })
  }
  render() {
    return (
      <div className="App wrapper">
        <h1>Reading List</h1>
        <BookSearchForm runSearch={this.runSearch}/>
        <SearchDisplay getSearchInfo={this.state.searchResults} addToRead={this.addToRead} addFinished={this.addFinished}/>
        <ToReadDisplay toReadList={this.state.toReadList} removeFromToReadList={this.removeFromToReadList}/>
        <FinishedDisplay finishedList={this.state.finishedList} removeFromFinishedList={this.removeFromFinishedList}/>
      </div>
    );
  }
}


// Collect the user's input and search through the api to see if there is a match (use hackeryou proxy server to convert xml to json)
// Display the results from the api search. Add a plus icon in the corner of each result so the user can add it to their list. 
// Display each book in the to-read array as a Component. Each Component will have the book cover, the book title, the book author, a checkmark to move it to the completed list, and an X to remove it from the to-read list. If you click on the component, you will get more information about the book in a drop-down and can write notes (for exmaple, "Recommended by mom").
// Display each book in the complete-books array as a Component. Each Component will have the book cover, book title, book author, and a 5-star rating. The 5 stars are note filled out until the user clicks the number of starts the want to rank the book. If you click on the component, a drop-down will show more info about the book, notes about how you enjoyed it, and the 5 star rating. 

//create an alert before to confirm the user wants to delete a book

export default App;

