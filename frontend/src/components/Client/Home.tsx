import React from 'react'
import Navbar from './Navbar';
import "./Home.css"
import BookList from './BookList';


export const Home = () => {
  return (
    <div>
        <Navbar />
        <main className="home-main">
        <h1 className="home-title">Welcome to our library</h1>
        <h2 className="home-subtitle">
          Here you'll find special categories and books by renowned authors
        </h2>
      </main>
      <div id='book-section'>
      <BookList />
      </div>

  
      

      
      
    </div>
  )
}

export default Home;