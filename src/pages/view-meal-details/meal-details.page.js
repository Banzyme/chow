import React, {useState, useEffect} from "react";
import { LeftBackArrow } from './../../components/back-btn'
import {MealOptionModel} from './../../models/models'
import {AppSettings} from './../../shared/shared'
import "./meal-details.styles.css";

function MealDetailsPage({ match, mealInfo }) {
  const [selectedMeal, setSelectedMeal] = useState(mealInfo);
  console.debug("Parent gave us meal", mealInfo);

  const handleDelete = () => {
    alert("Are you sure, this cant  be undone?");
  };

  const handleMealEdit = () => {
    alert("Edit page coming soon");
  };

  const loadSelectedMealInfo = ()=>{
    const fetchUrl = `${AppSettings.mealsAPI.baseURL}/mealoptions/${match.params.id}`;
    fetch(fetchUrl)
    .then(res => res.json())
    .then(res => {
      console.debug(`Fetch meal by id ${match.params.id} returned`, res);
      setSelectedMeal(res);
      localStorage.setItem(match.params.id, JSON.stringify(res));
    })
    .catch((e) => {
      console.error(e);
    });

  }

  useEffect(() => {
    loadSelectedMealInfo();
  }, []);

  
  return (
    <>
      <header>
        <LeftBackArrow className="back-arrow" />
        <h1>{selectedMeal?.name}</h1>
      </header>


      <section className="action-btns">
        <button className="chow-btn-outline edit-btn" onClick={handleMealEdit}>
          Edit<i className="fa fa-edit btn-icon"></i>
        </button>
        <button className="chow-btn" onClick={handleDelete}>
          Delete<i className="fa fa-trash btn-icon"></i>
        </button>
      </section>
    </>
  );
}

export default MealDetailsPage;
