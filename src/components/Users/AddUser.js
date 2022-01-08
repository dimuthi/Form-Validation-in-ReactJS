import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helper/Wrapper";

const AddUser = (props) => {
  const [EnteredUsername, setEnteredUsername] = useState("");
  const [Enteredage, setEnteredage] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (EnteredUsername.trim().length === 0 || Enteredage.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter valid username and age (non empty)",
      });
      return;
    }
    if (+Enteredage < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter valid age (>0)",
      });
      return;
    }
    console.log(Enteredage, EnteredUsername);
    props.onAddUser(EnteredUsername, Enteredage);
    setEnteredUsername("");
    setEnteredage("");
  };

  const userNameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnteredage(event.target.value);
  };
  const cancelHandler = (event) => {
    setError(null);
  };
  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          cancel={cancelHandler}
        />
      )}
      ;
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="userName">Add User</label>
          <input
            type="text"
            id="userName"
            onChange={userNameChangeHandler}
            value={EnteredUsername}
          ></input>
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            onChange={ageChangeHandler}
            value={Enteredage}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
