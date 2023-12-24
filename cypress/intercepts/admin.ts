const createAdmin = () => {
  cy.intercept("POST", "/accounts", {
    statusCode: 200,
    body: {
      id_account: 1,
      email: "",
      account_category: "admin",
    },
  }).as("createAdmin");
};

const createAdminRepeated = () => {
  cy.intercept("POST", "/accounts", {
    statusCode: 409,
    body: {
      detail: "Email already registered",
    },
  });
};

const adminList = (
  num: number,
  page?: number,
  emailQuery?: string,
  sortOrder?: "asc" | "desc",
  sortField?: "email" | "account_category"
) => {
  console.log(
    `PASCACIO /accounts?page=${page || 1}&size=10&email_like=${
      emailQuery || ""
    }${sortOrder ? `&order=${sortOrder}` : ""}${
      sortField ? `&order_by=${sortField}` : ""
    }`
  );
  cy.intercept(
    "GET",
    `/accounts?page=${page || 1}&size=10&email_like=${emailQuery || ""}${
      sortOrder ? `&order=${sortOrder}` : ""
    }${sortField ? `&order_by=${sortField}` : ""}`,
    {
      statusCode: 200,
      body: {
        total: num,
        size: 10,
        page: 1,
        pages: Math.floor(num / 10),
        items: Array.from({ length: num < 10 ? num : 10 }, (_, i) => ({
          id_account: i + 1,
          email: `admin-${i}@email.com`,
          account_category: i % 2 === 0 ? "admin" : "superadmin",
        })),
      },
    }
  ).as(
    `adminList?page=${page || 1}?email_like=${emailQuery || ""}${
      sortOrder ? `?sortOrder=${sortOrder}` : ""
    }${sortField ? `?sortField=${sortField}` : ""}`
  );
};

const deleteAdmin = (id: number) => {
  cy.intercept("DELETE", `/accounts/${id}`, {
    statusCode: 200,
    body: {},
  }).as("deleteAdmin");
};

export { createAdmin, createAdminRepeated, adminList, deleteAdmin };
