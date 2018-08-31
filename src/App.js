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
import Footer from './components/Footer';

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
  // Search through the api to see if there is a match (use hackeryou proxy server to convert xml to json)
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
      bookTitle: bookObject.best_book.title,
      bookAuthor: bookObject.best_book.author.name,
      bookCover: bookObject.best_book.image_url,
      rating: 0
    })
  }
  addFinished = (bookObject) => {
    finishedListRef.push({
      bookTitle: bookObject.best_book.title,
      bookAuthor: bookObject.best_book.author.name,
      bookCover: bookObject.best_book.image_url,
      rating: 0
    })
  }
  removeFromToReadList = (key) => {
    const book = firebase.database().ref(`/toReadList/${key}`);
    book.remove();
  }
  removeFromFinishedList = (key) => {
    const book = firebase.database().ref(`/finishedList/${key}`);
    book.remove();
  }
  updateRating(starNum, key) {
    const book = firebase.database().ref(`/finishedList/${key}`);
    book.update({
      rating: starNum
    });
    console.log(book)
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
        <FinishedDisplay finishedList={this.state.finishedList} removeFromFinishedList={this.removeFromFinishedList} updateRating={this.updateRating}/>
        <Footer/>
      </div>
    );
  }
}

 
// ToReadList: If you click on the component, you will get more information about the book in a drop-down and can write notes (for exmaple, "Recommended by mom").
// FinishedDisplay: If you click on the component, a drop-down will show more info about the book, notes about how you enjoyed it, and the 5 star rating.
// make sure firebase remembers the user's rating in the finished books list 
// when a user change their mind about a rating they originally gave, enable them to change the rating

export default App;

