import { get } from "./axios";

const parseSortBy = (sortField: string): string => {
  switch (sortField) {
    case "email":
      return "email";
    case "type":
      return "account_category";
  }
  return "";
};

const list = (
  page: number,
  perPage: number,
  searchQuery: string,
  sortField: string,
  sortDir: "asc" | "desc" | ""
) => {
  const query: Record<string, string | number> = {
    skip: (page - 1) * perPage,
    limit: perPage,
    email_like: searchQuery,
  };

  if (sortField) {
    query["order_dir"] = sortDir;
    query["order_by"] = parseSortBy(sortField);
  }

  return get("accounts", query);
};

export default {
  list,
};
