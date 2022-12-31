import axios from "../utils/axios";

const getUserQuestions = async (session: any) => {
  const Questions = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/question/user/${session?.user?.email}`
  );
  const questions = await Questions.json();
  return questions;
};

const createAnswerPriviledgeRequest = async (email: string) => {
  const newRequest = await axios({
    url: "user/requests",
    method: "POST",
    data: {
      userEmail: email,
    },
  });
  return newRequest;
};

const createQuestion = async (
  category: string,
  content: string,
  userEmail: string
) => {
  const newQuestion = await axios({
    url: "question/create",
    method: "POST",
    data: {
      category: category,
      content: content,
      userEmail: userEmail,
    },
  });
  return newQuestion;
};

export { getUserQuestions, createAnswerPriviledgeRequest, createQuestion };
