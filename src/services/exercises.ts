import { deleteRequest, get, jsonPost, jsonPatch } from "./axios";

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
    page: page,
    size: perPage,
    title_like: searchQuery,
  };

  if (sortField) {
    query["order"] = sortDir;
    query["order_by"] = parseSortBy(sortField);
  }

  return get("exercises", query)
    .then((response) => {
      return Promise.resolve({
        data: response.data.items,
        total: response.data.total,
      });
    })
    .catch((error) => Promise.reject(error));
};

const create = async (title: string, text: string, complexity: string, category: string) => {
  return jsonPost("exercises", {
    title,
    text,
    complexity: complexity.toLowerCase(),
    category,
  });
};

const deleteExercise = async (id: string) => {
  return deleteRequest(`exercises/${id}`);
};


const edit = async (id:string,title: string, text: string, complexity: string, category?: string) => {
  return jsonPatch(`exercises/${id}`, {
    title,
    text,
    complexity: complexity.toLowerCase(),
    category,
  })
};
const getByID = async (id:string) => {
  return get(`exercises/${id}`)
};

export default {
  listExercises,
  create,
  deleteExercise,
  edit,
  getByID,
};
