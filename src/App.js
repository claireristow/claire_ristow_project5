import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';

class App extends Component {
  componentDidMount() {
    axios.get({
      // method: 'GET',
      url: 'http://proxy.hackeryou.com',
      //OR url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: "https://www.goodreads.com/search.xml",
        params: {
          'key': "wzahGILEJsuTlYRpoLoEw"
        },
        xmlToJSON: true,
        useCache: false
      }
    }).then((res) => {
        console.log(res);
    })
  }
  render() {
    return (
      <div className="App">
        <h1>Reading List</h1>
      </div>
    );
  }
}

// Create empty arrays to store the to-read list and the finished list
// Collect the user's input and search through the api to see if there is a match (use hackeryou proxy server to convert xml to json)
// Display the results from the api search. Add a plus icon in the corner of each result so the user can add it to their list. 
// Display each book in the to-read array as a Component. Each Component will have the book cover, the book title, the book author, a checkmark to move it to the completed list, and an X to remove it from the to-read list. If you click on the component, you will get more information about the book in a drop-down and can write notes (for exmaple, "Recommended by mom").
// Display each book in the complete-books array as a Component. Each Component will have the book cover, book title, book author, and a 5-star rating. The 5 stars are note filled out until the user clicks the number of starts the want to rank the book. If you click on the component, a drop-down will show more info about the book, notes about how you enjoyed it, and the 5 star rating. 

export default App;

