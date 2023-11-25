import { get } from "./axios";

const list = (
  page: number,
  perPage: number,
  searchQuery: string,
  sortField: string,
  sortDir: "asc" | "desc" | ""
) => {
  const query: Record<string, string | number> = {
    page: page,
    size: perPage,
    name_like: searchQuery,
  };

  if (sortField) {
    query["order"] = sortDir;
    query["order_by"] = sortField;
  }

  return get("categories", query)
    .then((response) => {
      return Promise.resolve({
        data: response.data.items.map(
          (item: { category: string }) => item.category
        ),
        total: response.data.total,
      });
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export default {
  list,
};
