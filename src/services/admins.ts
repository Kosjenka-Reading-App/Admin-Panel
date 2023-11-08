import { get } from "./axios";

const list = (
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
    email_like: searchQuery,
  };

  return get("accounts", query);
};

export default {
  list,
};
