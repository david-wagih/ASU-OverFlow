import { User } from "@prisma/client";

// @ts-ignore
export const fetcher = (url: String, data) =>
  fetch(window.location.origin + url, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
