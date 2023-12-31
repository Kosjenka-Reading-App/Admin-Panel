import { deleteRequest, get, jsonPost } from "./axios";

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
    page: page,
    size: perPage,
    email_like: searchQuery,
  };

  if (sortField) {
    query["order"] = sortDir;
    query["order_by"] = parseSortBy(sortField);
  }

  return get("accounts", query)
    .then((response) => {
      return Promise.resolve({
        data: response.data.items,
        total: response.data.total,
      });
    })
    .catch((error) => Promise.reject(error));
};

const create = (email: string, isSuperAdmin: boolean) => {
  return jsonPost("accounts", {
    email,
    is_superadmin: isSuperAdmin,
  });
};

const confirm = (password: string, token: string) => {
  return jsonPost("accounts/activate", {
    password,
    token,
  });
};

const deleteAdmin = (id: number) => {
  return deleteRequest(`accounts/${id}`);
};

export default {
  list,
  create,
  deleteAdmin,
  confirm,
};
