import React, { useState, useEffect } from "react";
import "./daily-view-page.css";
import GroupedListItem from "./../components/grouped-list-item/grouped-list-item";
import TestItemsList, { periods } from "./../testdata/seed";


const getMealsForPeriod = ({repository, period}) => {
  const dayNum = new Date().getDay() == 0? 7: new Date().getDay();
  return repository.filter(item => {
    return item.day === dayNum && item.period === period;
  });
}

const DailyViewPage = props => {
  const db_mock = TestItemsList;
  const [hasErrors, setHasErros] = useState(false);
  const [mealOptions, setMealOptions] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("mealOptionsList") === null) {
      fetch("https://chow-api.azurewebsites.net/api/chow-options/all")
        .then(res => res.json())
        .then(res => {
          setMealOptions(res);
          localStorage.setItem("mealOptionsList", JSON.stringify(res));
          console.log("Results retrned from a api: ", res);
        })
        .catch(() => setHasErros({ hasErrors: true }));
    } else {
      const cachedData = localStorage.getItem("mealOptionsList");
      setMealOptions(JSON.parse(cachedData));
    }
  }, []);

  const currentDateTime = new Date();
  const dayNum = currentDateTime.getDay() == 0? 7: currentDateTime.getDay();

  // const filters = mealOptions.filter(item => {
  //   return item.day === dayNum && item.period == 1
  // });
  // console.log("Filtered for today: ", filters);

  const breakfastMeals = getMealsForPeriod({repository: mealOptions, period: periods.breakfast});

  const group_2 = db_mock.filter(item => {
    return item.day === dayNum && item.period === periods.brunch;
  });

  const group_3 = db_mock.filter(item => {
    return item.day === dayNum && item.period === periods.afternoon;
  });

  const group_4 = db_mock.filter(item => {
    return item.day === dayNum && item.period === periods.lateAfternoon;
  });

  const group_5 = db_mock.filter(item => {
    return item.day === dayNum && item.period === periods.lateAfternoon;
  });

  const group_6 = db_mock.filter(item => {
    return item.day === dayNum && item.period === periods.lateAfternoon;
  });

  const viewAddPage = () => {
    props.history.push("/create");
  };

  return (
    <>
      <header className="page-header">
        <section>
          <h1>Today</h1>
        </section>
        <section>
          <h1>
            <small>{currentDateTime.toDateString()}</small>
          </h1>
        </section>
      </header>
      <article>
        <section className="section-divider">
          <hr />
        </section>
        <GroupedListItem mealOptions={breakfastMeals} />
        <GroupedListItem mealOptions={group_2} />
        <GroupedListItem mealOptions={group_2} />
        <GroupedListItem mealOptions={group_2} />
      </article>
      <footer>
        <button onClick={viewAddPage}>Add new</button>
      </footer>
    </>
  );
};

export default DailyViewPage;
