import { jsonPost } from "./axios";
//import Cookies from "js-cookie";

const createExercise = async (title: string, text: string, complexity: string) => {
  return jsonPost("exercises/", { title, text, complexity })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { createExercise };
