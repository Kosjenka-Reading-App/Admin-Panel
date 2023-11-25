import { deleteRequest, get, jsonPost } from "./axios";

const parseSortBy = (sortField: string): string => {
  switch (sortField) {
    case "title":
      return "title";
    case "complexity":
      return "complexity";
    case "last update":
      return "date";
  }
  return "";
};

const listExercises = (
  page: number,
  perPage: number,
  searchQuery: string,
  sortField: string,
  sortDir: "asc" | "desc" | ""
) => {
  const query: Record<string, string | number> = {
    skip: (page - 1) * perPage,
    limit: perPage,
    title_like: searchQuery,
  };

  if (sortField) {
    query["order_dir"] = sortDir;
    query["order_by"] = parseSortBy(sortField);
  }

  return get("exercises", query);
};

const create = async (title: string, text: string, complexity: string) => {
  return jsonPost("exercises/", {
    title,
    text,
    complexity: complexity.toLowerCase(),
  })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const deleteExercise = async (id: string) => {
  return deleteRequest(`exercises/${id}`);
};

export default {
  listExercises,
  create,
  deleteExercise,
};
