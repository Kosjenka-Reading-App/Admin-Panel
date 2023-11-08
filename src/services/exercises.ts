import { get } from "./axios";

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
    query["order_dir"] = sortField;
    query["title_like"] = sortDir;
  }

  return get("exercises", query);
};

export default {
  listExercises,
};
