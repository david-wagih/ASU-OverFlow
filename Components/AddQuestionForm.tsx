import { Button, FormGroup, FormLabel, Input } from "@mui/material";
import Select from "react-select";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CategoryOptions } from "../utils/categoryOptions";
import { NextApiRequest, NextApiResponse } from "next";

// todo : this method will handle the post request to add new question to the database

const AddQuestionForm = (props: any) => {
  const { openPopUp, setOpenPopUp } = props;
  const { data } = useSession();
  const [value, setValue] = useState();
  const [categoryfield, setCategoryfield] = useState();

  const handleInputField = (e: any) => {
    setValue(e.target.value);
  };
  const handleCategoryChosing = (categoryfield: any) => {
    setCategoryfield(categoryfield);
  };

  // todo : need to implement here to post the question in the database
  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const newQuestion = await fetch(
        "http://localhost:3000/api/question/create",
        {
          method: "POST",
          body: JSON.stringify({
            //@ts-ignore
            category: categoryfield?.label,
            content: value,
            userEmail: data?.user?.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newQuestionJson = await newQuestion.json();
      console.log(newQuestionJson);
      setOpenPopUp(false);
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
          Enter Your Question Here
        </label>
        <Input
          value={value}
          onChange={handleInputField}
          style={{
            width: "100%",
            marginBottom: "3rem",
          }}
          type="text"
        ></Input>
        <Select
          onChange={handleCategoryChosing}
          value={categoryfield}
          options={CategoryOptions}
        ></Select>
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

export default AddQuestionForm;
