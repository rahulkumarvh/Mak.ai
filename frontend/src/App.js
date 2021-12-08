import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import { ImageUpload } from "./components/Predict";

function App() {
  return (
    <>
      <Nav />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/predict" exact component={ImageUpload} />
          <Route path="/predict" exact component={ImageUpload} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
