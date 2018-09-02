import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';
import firebase from './firebase';

//COMPONENTS
import Header from './components/Header';
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
  // add the selected api book results to the toReadList on firebase
  addToRead = (bookObject) => {
    toReadListRef.push({
      bookTitle: bookObject.best_book.title,
      bookAuthor: bookObject.best_book.author.name,
      bookCover: bookObject.best_book.image_url,
      rating: []
    })
  }
  // add the selected api book results to the toReadList on firebase
  addFinished = (bookObject) => {
    finishedListRef.push({
      bookTitle: bookObject.best_book.title,
      bookAuthor: bookObject.best_book.author.name,
      bookCover: bookObject.best_book.image_url,
      rating: []
    })
  }
  // when the remove button is clicked, remove the book item from firebase toReadList
  removeFromToReadList = (key) => {
    const book = firebase.database().ref(`/toReadList/${key}`);
    book.remove();
  }
  // when the remove button is clicked, remove the book item from firebase finishedList
  removeFromFinishedList = (key) => {
    const book = firebase.database().ref(`/finishedList/${key}`);
    book.remove();
  }
  // update the number of stars the user selected in the firebase database with using the book key 
  updateRating(starFillArray, key) {
    const book = firebase.database().ref(`/finishedList/${key}`);
    book.update({
      rating: starFillArray
    });
    console.log(book)
  }
  // update the App states with firebase database content
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
  // compilation of custom components
  render() {
    return (
      <div className="App bigFlex">
        <Header />
        <div className="wrapper">
          <BookSearchForm runSearch={this.runSearch}/>
          <SearchDisplay getSearchInfo={this.state.searchResults} addToRead={this.addToRead} addFinished={this.addFinished}/>
          <ToReadDisplay toReadList={this.state.toReadList} removeFromToReadList={this.removeFromToReadList}/>
          <FinishedDisplay finishedList={this.state.finishedList} removeFromFinishedList={this.removeFromFinishedList} updateRating={this.updateRating} checkStarFillClass={this.state.finishedList}/>
          <Footer/>
        </div>
      </div>
    );
  }
}

 
// ToReadList: If you click on the component, you will get more information about the book in a drop-down and can write notes (for exmaple, "Recommended by mom").
// FinishedDisplay: If you click on the component, a drop-down will show more info about the book, notes about how you enjoyed it, and the 5 star rating.
// make sure firebase remembers the user's rating in the finished books list 
// when a user changes their mind about a rating they originally gave, enable them to change the rating

export default App;

