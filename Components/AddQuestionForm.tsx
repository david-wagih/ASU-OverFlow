import { Button, FormGroup, FormLabel, Input } from "@mui/material";
import Select from "react-select";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CategoryOptions } from "../utils/categoryOptions";
import { NextApiRequest, NextApiResponse } from "next";
import { createQuestion } from "../services/userServices";

// todo : this method will handle the post request to add new question to the database

const AddQuestionForm = (props: any) => {
  const { openPopUp, setOpenPopUp } = props;
  const { data } = useSession();
  const [value, setValue] = useState("");
  const [categoryfield, setCategoryfield] = useState({
    value: "0",
    label: "Choose Category",
  });

  const handleInputField = (e: any) => {
    setValue(e.target.value);
  };
  const handleCategoryChosing = (categoryfield: any) => {
    setCategoryfield(categoryfield);
  };

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();

      const newQuestion = await createQuestion(
        categoryfield!.label!,
        value!,
        data!.user!.email!
      );
      console.log(newQuestion);
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
