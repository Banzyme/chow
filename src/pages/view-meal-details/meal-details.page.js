import React, { useState, useEffect } from "react";
import { LeftBackArrow } from './../../components/back-btn'
import { MealOptionModel } from './../../models/models'
import { AppSettings } from './../../shared/shared'
import "./meal-details.styles.css";
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function MealDetailsPage({ history, match }) {
  const mealId = match.params.id;
  const [selectedMeal, setSelectedMeal] = useState();
  const [snackState, setSnackState] = useState({ isOpen: false, msg: "Success", timeout: 2000, severity: "info", lastRide: false });
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);

    return;
  };

  const handleSnackClose = () => {
    setIsLoading(false);
    setSnackState({
      isOpen: false
    });
    if (snackState.lastRide) {
      history.push("/");
    }
  };

  const handleMealEdit = () => {
    console.debug("Edit page not implemented");
  };

  const loadSelectedMealInfo = () => {
    const cachedData = localStorage.getItem(match.params.id);
    if (cachedData) {
      const cachedMeal = JSON.parse(cachedData);
      console.debug(`Fetch meal by id ${match.params.id} returned from local cache`, cachedMeal);
      setSelectedMeal(cachedMeal);
      setIsLoading(false);
      return;
    }

    const fetchUrl = `${AppSettings.mealsAPI.baseURL}mealoptions/${match.params.id}`;
    fetch(fetchUrl)
      .then(res => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(`Meal [ ${mealId} ] does not exist!`);
      })
      .then(res => {
        console.debug(`Fetch meal by id ${match.params.id} returned`, res);
        setSelectedMeal(res);
        localStorage.setItem(match.params.id, JSON.stringify(res));
      })
      .catch((e) => {
        console.error(e);
        history.push('/');
      });
    setIsLoading(false);

  }

  const deleteCachedMealData = () => {
    const cachedData = localStorage.getItem(mealId);
    if (cachedData) {
      localStorage.removeItem(mealId);
      // This is easier for now, maybe will do the filtering later
      localStorage.removeItem("mealOptionsList");
    }
  }

  const handleDeleteAccept = () => {
    setShowModal(false);
    setIsLoading(true);
    deleteCachedMealData()

    fetch(`${AppSettings.mealsAPI.baseURL}mealoptions?id=${selectedMeal.mealId}`, { method: 'DELETE' })
      .then(response => {
        if(response.ok){
          console.debug("Delete response", response);
          setSnackState({
            isOpen: true,
            timeout: 700,
            lastRide: true,
            severity: "info",
            msg: "Meal successfully deleted"
          });
        }else{
          setSnackState({
            isOpen: true,
            timeout: 700,
            lastRide: true,
            severity: "warning",
            msg: "Item not deleted, please try again"
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleDeleteReject = () => {
    setShowModal(false);
  };

  useEffect(() => {
    loadSelectedMealInfo();
  }, []);


  return (
    <div className="container">
      <header>
        <LeftBackArrow className="back-arrow" />
        <h1>{selectedMeal?.name}</h1>
      </header>

      <section className="detailsBody">

      </section>


      <section className="action-btns">
        <button className="chow-btn-outline edit-btn" onClick={handleMealEdit}>
          Edit<i className="fa fa-edit btn-icon"></i>
        </button>
        <button className="chow-btn" onClick={handleDelete}>
          Delete<i className="fa fa-trash btn-icon"></i>
        </button>
      </section>
      <Dialog
        open={showModal}
        onClose={() => { }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this meal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteReject} color="primary">
            No, God Stop!
          </Button>
          <Button onClick={handleDeleteAccept} color="primary" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackState.isOpen} autoHideDuration={snackState.timeout} onClose={handleSnackClose}>
        <Alert severity={snackState.severity}>
          {snackState.msg}
        </Alert>
      </Snackbar>
      {isLoading ? <LinearProgress color="secondary" /> : ""}

    </div>
  );
}

export default MealDetailsPage;
