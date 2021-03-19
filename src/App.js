import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DailyViewPage from "./pages/daily-view-page/daily-view-page";
import AddMealPage from "./pages/add-meal/add-meal.page";
import MealDetailsPage from './pages/view-meal-details/meal-details.page';


function App(props) {
  return (
    <>
      <Router className="content-container">
        <main>
          <Switch>
            <Route path="/" exact component={DailyViewPage} />
            <Route path="/create" exact component={AddMealPage} />
            <Route path="/details/:id" exact component={MealDetailsPage} />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
