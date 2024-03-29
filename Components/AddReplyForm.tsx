import { Button, FormGroup, FormLabel, Input } from "@mui/material";
import Select from "react-select";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CategoryOptions } from "../utils/categoryOptions";
import { NextApiRequest, NextApiResponse } from "next";
import { Router } from "express";
import { useRouter } from "next/router";

const AddReplyForm = (props: any) => {
  const { answerId, setOpenPopUp, userEmail } = props;
  const [value, setValue] = useState();

  const handleInputField = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (event: any) => {
    try {
      const newReply = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/answer/${answerId}/reply/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answerId: Number(answerId),
            content: String(value),
            userEmail: String(userEmail),
          }),
        }
      );
      const newReplyJSON = await newReply.json();
      console.log(newReplyJSON);
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
