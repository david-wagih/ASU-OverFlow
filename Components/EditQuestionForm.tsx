import { Button, FormGroup, Input } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const EditQuestionForm = (props: any) => {
  {
    const { openPopUp, setOpenPopUp, questionId } = props;
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
        const updatedQuestion = await fetch(
          `https://asu-over-flow.vercel.app/api/question/${questionId}`,
          {
            method: "PUT",
            body: JSON.stringify({
              id: questionId,
              content: value,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const newQuestionrJSON = await updatedQuestion.json();
        console.log(newQuestionrJSON);
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
            Enter Your new Question Content here
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
  }
};

export default EditQuestionForm;
