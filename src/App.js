import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import DailyViewPage from "./pages/daily-view-page/daily-view-page";
import AddMealPage from "./pages/add-meal/add-meal.page";

function App() {
  return (
    <Router className="content-container">
      <header className="App-header">
        <h4>Chow</h4>
      </header>
      <main>
        <Route path="/" exact component={DailyViewPage} />
        <Route path="/create" component={AddMealPage} />
      </main>
      <footer>
        <span>
          &copy; All rights reserved.{" "}
          <a href="https://peculia.xyz">peculia.xyz</a>
        </span>
      </footer>
    </Router>
  );
}

export default App;
