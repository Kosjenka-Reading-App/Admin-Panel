import { get, jsonPost } from "./axios";

const list = (
  page: number,
  pageSize: number,
  search: string
) => {
  const query = { page, pageSize, search };
  return get("categories", query);
};

const create = (name: string) => {
  return jsonPost(`categories/${name}`);
};

export default {
  list,
  create,
};
