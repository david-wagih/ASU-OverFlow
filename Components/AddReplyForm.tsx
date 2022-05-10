import { Button, FormGroup, FormLabel, Input } from "@mui/material";
import Select from "react-select";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CategoryOptions } from "../utils/categoryOptions";
import { NextApiRequest, NextApiResponse } from "next";
import { Router } from "express";
import { useRouter } from "next/router";

const AddReplyForm = (props: any) => {
  const { openPopUp, setOpenPopUp, answerId } = props;
  const { data } = useSession();
  const [value, setValue] = useState();
  const router = useRouter();

  const handleInputField = (e: any) => {
    setValue(e.target.value);
  };

  // todo : need to implement here to create a reply in the database
  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const newReply = await fetch(
        `https://asu-over-flow.vercel.app/api/answer/${answerId}/reply/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answerId: answerId,
            content: value,
            userEmail: data?.user?.email,
          }),
        }
      );
      const newReplyJSON = await newReply.json();
      console.log(newReplyJSON);
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
          Enter Your Reply Here
        </label>
        <Input
          value={value}
          onChange={handleInputField}
          style={{
            width: "100%",
            marginBottom: "5rem",
          }}
          type="text"
        ></Input>
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

export default AddReplyForm;
