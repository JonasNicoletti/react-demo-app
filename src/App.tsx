import Footer from "modules/common/components/footer/Footer";
import Header from "modules/common/components/header/Header";
import Home from "modules/home/components/Home";
import React from "react";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Home />
      <Footer />
    </div>
  );
}

export default App;
