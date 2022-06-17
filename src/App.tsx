import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/home/Home';
import Gallery from './components/gallery/Gallery';
import Detail from './components/gallery/Detail';
import Publish from './components/publish/Publish';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:postId" element={<Detail />} />
        <Route path="/publish" element={<Publish />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
