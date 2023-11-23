import { get, jsonPost } from "./axios"; 

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
    name_like: searchQuery,
  };

  if (sortField) {
    query["order_dir"] = sortDir;
    query["order_by"] = sortField;
  }

  return get("categories", query);
};

const create = (name: string) => {
  const body = { name };
  return jsonPost("categories", body);
};

export default {
  list,
  create,
};
