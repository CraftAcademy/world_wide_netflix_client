import React, {useState} from 'react';
import Footer from './components/Footer';
import HeaderMainPage from './components/Header';
import MainPageMovieContainer from './components/MainPageMovieContainer';


function App() {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <HeaderMainPage setUpdate={setUpdate} />
      <MainPageMovieContainer update={update} />
      <Footer />
    </>
  );
}

export default App;
