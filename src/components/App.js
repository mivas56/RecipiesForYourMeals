import React from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Random from "./Random/Random";
import SearchResult from "./SearchResults/SearchResult";
import SearchCategory from "./SearchResults/SearchCategory";
import SingleMeal from "./SearchResults/SingleMeal";
import SearchCountry from "./SearchResults/SearchCountry";
import FavoritePage from "./FavoritePage/FavoritePage";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="pagecontent">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
          <Switch>
            <Route path="/random" exact>
              <Random />
            </Route>
          </Switch>
          <Switch>
            <Route path="/searchcategory/:title" component={SearchCategory} />
          </Switch>
          <Switch>
            <Route path="/searchcountry/:title" component={SearchCountry} />
          </Switch>
          <Switch>
            <Route path="/searchresult" component={SearchResult} />
          </Switch>
          <Switch>
            <Route path="/favorite" component={FavoritePage} />
          </Switch>
          <Switch>
            <Route path="/singlemeal" component={SingleMeal} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
