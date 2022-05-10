import { Button, FormGroup, FormLabel, Input, TextField } from "@mui/material";
import Select from "react-select";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CategoryOptions } from "../utils/categoryOptions";
import { NextApiRequest, NextApiResponse } from "next";
import { Router } from "express";
import { useRouter } from "next/router";

// todo : this method will handle the post request to add new question to the database

const AddAnswerForm = (props: any) => {
  const { openPopUp, setOpenPopUp, questionId } = props;
  const { data } = useSession();
  const [value, setValue] = useState();
  const [error, setError] = useState({});
  const router = useRouter();

  const handleInputField = (e: any) => {
    setValue(e.target.value);
  };

  // todo : need to implement here to post the question in the database
  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const newAnswer = await fetch(
        "https://asu-over-flow.vercel.app/api/answer/create",
        {
          method: "POST",
          body: JSON.stringify({
            content: value,
            questionId: Number(questionId),
            userEmail: data?.user?.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newAnswerJSON = await newAnswer.json();
      console.log(newAnswerJSON);
      setOpenPopUp(false);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <FormGroup
        style={{
          margin: "auto",
        }}
      >
        <label
          style={{
            fontSize: "0.8rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Enter Your Answer Here
        </label>

        <TextField
          style={{
            marginTop: "5px",
            marginBottom: "5px",
          }}
          value={value}
          onChange={handleInputField}
          variant="outlined"
          helperText="Make the answer not more than 80 characters"
        ></TextField>

        <Button
          style={{
            marginTop: "3rem",
            width: "100px",
            position: "relative",
            left: "50%",
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormGroup>
    </>
  );
};

export default AddAnswerForm;
