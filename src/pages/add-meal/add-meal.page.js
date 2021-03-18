import React, { useState } from "react";
import SimpleBackBtn from './../../components/back-btn';
import {AppSettings} from '../../shared/shared'
import "./add-meal.page.css";


const postDataToRemoteServer = async ({ data }) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  console.debug(`Adding new meal to db: ${data}`);
  return fetch(`${AppSettings.mealsAPI.baseURL}/mealoptions`, postOptions)
    .then(response => response.json())
    .then(res => res)
    .catch(err => {
      throw err;
    });
};

function AddMealPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrs, setFormErrs] = useState("");

  const [mealName, setMealName] = useState("");
  const [mealDescr, setMealDescr] = useState("");
  const [mealCategory, setMealCategory] = useState("");
  const [period, setPeriod] = useState(1);
  const [dayNum, setDayNum] = useState(1);

  const handleMealNameChange = event => setMealName(event.target.value);
  const handleMealDescrChange = event => setMealDescr(event.target.value);
  const handleCategoryChange = event => setMealCategory(event.target.value);
  const handleDayNumChange = event => setDayNum(event.target.value);

  const resetForm = () => {
    setIsLoading(false);
    setFormErrs("");
    setMealName("");
    setMealDescr("");
    setPeriod(1);
    setDayNum(1);
  };

  const submitNewMealOption = async event => {
    event.preventDefault();
    const formVal = {
      id: "",
      uniqueIdentifier: "tty",
      shortName: mealName,
      description: mealDescr,
      period: Number(period),
      day: Number(dayNum)
    };

    setIsLoading(true);
    try {
      await postDataToRemoteServer({ data: formVal });
      console.debug("New meal successfully added");
    } catch (error) {
      console.error("Error adding new meal", error);
    } finally {
      resetForm();
    }
  };
  return (
    <>
      <header>
        <h2>Add a new meal</h2>
      </header>
      <form onSubmit={submitNewMealOption}>
        <section className="form-group">
          <label htmlFor="mealName">Meal Name</label>
          <input
            type="text"
            value={mealName}
            maxLength="100"
            onChange={handleMealNameChange}
            name="mealName"
            id="mealName"
            className="chow-text-input"
            placeholder="e.g. Protein shake"
          />
        </section>

        <section className="form-group">
          <label htmlFor="mealDescr">Description</label>
          <textarea
            rows="6"
            value={mealDescr}
            onChange={handleMealDescrChange}
            name="mealDescr"
            id="mealDescr"
            className="chow-text-area"
            placeholder="e.g. 150g herbal shake with semi-skimmed milk"
          />
        </section>

        {/* <section className="form-group">
          <label htmlFor="dayNum">Day number</label>
          <input
            type="number"
            value={dayNum}
            onChange={handleDayNumChange}
            min="1"
            max="7"
            name="dayNum"
            id="dayNum"
            className="chow-text-input"
            placeholder="e.g. 1 - Monday, 2 -Tuesday etc."
          />
        </section> */}

        <section className="form-group">
          <label htmlFor="Category">Period</label>
          <input
            type="text"
            value={mealCategory}
            onChange={handleCategoryChange}
            name="category"
            id="category"
            className="chow-text-input"
            placeholder="e.g. Breakfast, Lunch, Supper etc."
          />
        </section>

        <section className="action-btns">
          <button className="chow-btn">Save</button>
          <SimpleBackBtn/>
        </section>
      </form>
    </>
  );
}

export default AddMealPage;
