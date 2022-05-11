import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, FormGroup, Input } from "@mui/material";

const EditAnswerForm = (props: any) => {
  const { answerId, openPopUp, setOpenPopUp, questionId, userEmail } = props;
  const { data } = useSession();
  const [value, setValue] = useState();
  const router = useRouter();

  const handleInputField = (e: any) => {
    setValue(e.target.value);
  };

  // todo : need to implement here to post the question in the database
  const handleUpdate = async (event: any) => {
    try {
      event.preventDefault();
      const updatedAnswer = await fetch(
        `https://asu-over-flow.vercel.app/api/answer/${answerId}/update`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: answerId,
            content: value,
            userEmail: userEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newAnswerJSON = await updatedAnswer.json();
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
          Enter Your new Answer Content here
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
          onClick={handleUpdate}
        >
          Update
        </Button>
      </FormGroup>
    </>
  );
};

export default EditAnswerForm;
