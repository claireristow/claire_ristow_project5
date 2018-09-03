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
  // when the 'Move to finished' button is clicked, the book is removed from the toReadList with removeFromToReadList function and it is added to the finishedList with this function - addFinished() can't be used because it accepts an object from the api, not a key from firebase
  moveToFinished = (key) => {
    finishedListRef.push({
      bookTitle: key.bookTitle,
      bookAuthor: key.bookAuthor,
      bookCover: key.bookCover,
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
  }
  // add the starFill class on specified rating stars if this.state.finishedList books have a rating
  checkStarFillClass = (finishedList) => {
    Object.keys(finishedList).map((key) => {
      if (finishedList[key].rating === undefined) {
        null
      } else if (finishedList[key].rating.length > 0) {
        const needsClass = Object.values(finishedList[key].rating)
        needsClass.map((starClass) => {
          if (document.querySelector(`.${key} .${starClass}`).classList.contains('starFill')) {
              null
          } else {
          document.querySelector(`.${key} .${starClass}`).classList.add('starFill');
          }
        })
      }
    })
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
      this.checkStarFillClass(this.state.finishedList)
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
          <ToReadDisplay toReadList={this.state.toReadList} removeFromToReadList={this.removeFromToReadList} moveToFinished={this.moveToFinished}/>
          <FinishedDisplay finishedList={this.state.finishedList} removeFromFinishedList={this.removeFromFinishedList} updateRating={this.updateRating}/>
          <Footer/>
        </div>
      </div>
    );
  }
}

 
// ToReadList: If you click on the component, you will get more information about the book in a drop-down and can write notes (for exmaple, "Recommended by mom").
// FinishedDisplay: If you click on the component, a drop-down will show more info about the book, notes about how you enjoyed it, and the 5 star rating
// optimize header img
// program 'move to finished' button on ToReadDisplay.js

export default App;