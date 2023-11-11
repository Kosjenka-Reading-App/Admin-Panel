import { get } from "./axios";

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

export default {
  listExercises,
};
