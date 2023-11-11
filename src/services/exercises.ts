import { get } from "./axios";

const listExercises = (
  page: number,
  perPage: number,
  searchQuery: string,
  sortField: string,
  sortDir: "asc" | "desc" | ""
) => {
  const query = {
    skip: (page - 1) * perPage,
    limit: perPage,
    order_by: sortField,
    order_dir: sortDir,
    title_like: searchQuery,
  };

  return get("exercises", query);
};

export default {
  listExercises,
};
