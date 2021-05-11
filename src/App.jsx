import React, { useState } from 'react';
import Footer from './components/Footer';
import HeaderMainPage from './components/Header';
import MainPageMovieContainer from './components/MainPageMovieContainer';

function App() {
  const [update, setUpdate] = useState(false);
  const [query, setQuery] = useState();
  const [message, setMessage] = useState('');
  

  return (
    <>
      <HeaderMainPage
        setUpdate={setUpdate}
        setQuery={setQuery}
        setMessage={setMessage}        
      />
      <MainPageMovieContainer update={update} query={query} message={message} />
      <Footer/>
    </>
  );
}

export default App;
