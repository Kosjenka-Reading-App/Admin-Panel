import { deleteRequest, get, jsonPost, jsonPatch } from "./axios";

type ExerciseResponse = {
  id: string;
  title: string;
  text: string;
  complexity: string;
  category: { category: string }[];
};

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
        data: response.data.items.map((item: ExerciseResponse) => ({
          ...item,
          category: item.category.map((category) => category.category),
        })),
        total: response.data.total,
      });
    })
    .catch((error) => Promise.reject(error));
};

const create = async (
  title: string,
  text: string,
  complexity: string,
  category: string[]
) => {
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

const edit = async (
  id: string,
  title: string,
  text: string,
  complexity: string,
  category: string[]
) => {
  return jsonPatch(`exercises/${id}`, {
    title,
    text,
    complexity: complexity.toLowerCase(),
    category,
  });
};

const getByID = async (id: string) => {
  return get(`exercises/${id}`)
    .then((response) => {
      return Promise.resolve({
        ...response.data,
        categories: response.data.category.map(
          (category: { category: string }) => category.category
        ),
      });
    })
    .catch((error) => Promise.reject(error));
};

export default {
  listExercises,
  create,
  deleteExercise,
  edit,
  getByID,
};
