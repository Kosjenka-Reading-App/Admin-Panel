import { adminList, deleteAdmin } from "../intercepts/admin";
import { meAdmin, meSuperadmin } from "../intercepts/login";

describe("template spec", () => {
  it("redirects page if not superadmin", () => {
    meAdmin();
    cy.visit("http://localhost:5173/admins");
    cy.url().should("include", "/exercises");
  });

  it("shows all elements of the admin list", () => {
    meSuperadmin();
    adminList(0);

    cy.visit("http://localhost:5173/admins");
    cy.wait("@adminList?page=1?email_like=");

    cy.contains("Admins").should("be.visible");
    cy.contains("New admin").should("be.visible");

    cy.contains("Actions").should("be.visible");
    cy.contains("type").should("be.visible");
    cy.contains("email").should("be.visible");
    cy.contains("#").should("be.visible");
    cy.get("input[placeholder=Search]").should("be.visible");
    cy.contains("#total-admins", "0").should("be.visible");
  });

  it("shows correct number of admins", () => {
    meSuperadmin();
    adminList(10);

    cy.visit("http://localhost:5173/admins");
    cy.wait("@adminList?page=1?email_like=");

    cy.get("div.rdt_TableBody").children().should("have.length", 10);
    cy.contains("#total-admins", "10").should("be.visible");

    cy.get("div.rdt_TableBody").children().first().contains("1");
    cy.get("div.rdt_TableBody")
      .children()
      .first()
      .contains("admin-0@email.com");
    cy.get("div.rdt_TableBody").children().first().contains("admin");

    cy.get("div.rdt_TableBody").children().last().contains("10");
    cy.get("div.rdt_TableBody").children().last().contains("admin-9");
    cy.get("div.rdt_TableBody").children().last().contains("Super Admin");
  });

  it("requests next page if limit is reached", () => {
    meSuperadmin();
    adminList(11);

    cy.visit("http://localhost:5173/admins");
    cy.wait("@adminList?page=1?email_like=");

    cy.get("div.rdt_TableBody").children().should("have.length", 10);
    cy.contains("#total-admins", "11").should("be.visible");
    cy.get("#pagination-next-page").should("not.disabled");
    cy.get("#pagination-previous-page").should("be.disabled");

    adminList(11, 2);
    cy.get("#pagination-next-page").click();
    cy.wait("@adminList?page=2?email_like=");
  });

  it("requests previous page if limit is reached", () => {
    meSuperadmin();
    adminList(11);

    cy.visit("http://localhost:5173/admins");
    cy.wait("@adminList?page=1?email_like=");

    cy.get("div.rdt_TableBody").children().should("have.length", 10);
    cy.contains("#total-admins", "11").should("be.visible");
    cy.get("#pagination-next-page").should("not.disabled");
    cy.get("#pagination-previous-page").should("be.disabled");

    adminList(11, 2);
    cy.get("#pagination-next-page").click();
    cy.wait("@adminList?page=2?email_like=");

    adminList(11);
    cy.get("#pagination-previous-page").click();
    cy.wait("@adminList?page=1?email_like=");
  });

  it("search filter requests correct information", () => {
    meSuperadmin();
    adminList(10);

    cy.visit("http://localhost:5173/admins");
    cy.wait("@adminList?page=1?email_like=");

    cy.get("div.rdt_TableBody").children().should("have.length", 10);

    adminList(1, 1, "admin-0");
    cy.get("input[placeholder=Search]").type("admin-0");
    cy.get("button[type=submit]").click();
    cy.wait("@adminList?page=1?email_like=admin-0");

    cy.get("div.rdt_TableBody").children().should("have.length", 1);
    cy.contains("#total-admins", "1").should("be.visible");
  });

  it("email sort requests correct information", () => {
    meSuperadmin();
    adminList(10);

    cy.visit("http://localhost:5173/admins");
    cy.wait("@adminList?page=1?email_like=");

    adminList(10, 1, "", "asc", "email");
    cy.contains("email").click();
    cy.wait("@adminList?page=1?email_like=?sortOrder=asc?sortField=email");

    adminList(10, 1, "", "desc", "email");
    cy.contains("email").click();
    cy.wait("@adminList?page=1?email_like=?sortOrder=desc?sortField=email");
  });

  it("type sort requests correct information", () => {
    meSuperadmin();
    adminList(10);

    cy.visit("http://localhost:5173/admins");
    cy.wait("@adminList?page=1?email_like=");

    adminList(10, 1, "", "asc", "account_category");
    cy.contains("type").click();
    cy.wait(
      "@adminList?page=1?email_like=?sortOrder=asc?sortField=account_category"
    );

    adminList(10, 1, "", "desc", "account_category");
    cy.contains("type").click();
    cy.wait(
      "@adminList?page=1?email_like=?sortOrder=desc?sortField=account_category"
    );
  });

  it("shows error message if there are no admins", () => {
    meSuperadmin();
    adminList(0);

    cy.visit("http://localhost:5173/admins");
    cy.wait("@adminList?page=1?email_like=");

    cy.contains("There are no records to display").should("be.visible");
  });

  it("shows delete modal and cancel should close", () => {
    meSuperadmin();
    adminList(10);

    cy.visit("http://localhost:5173/admins");
    cy.wait("@adminList?page=1?email_like=");

    cy.get("div.rdt_TableBody").children().should("have.length", 10);

    cy.get("div.rdt_TableBody").children().first().children().last().click();
    cy.contains("Remove Administator");
    cy.contains(
      'Are you sure you want to delete "admin-0@email.com"? You will have to manually add this admin later if this is a mistake!'
    );

    cy.contains("Cancel").click();
    cy.contains("Remove Administator").should("not.exist");
  });

  it.only("shows delete modal and confirm should call endpoint, close and refresh admin list", () => {
    meSuperadmin();
    adminList(10);
    deleteAdmin(1);

    cy.visit("http://localhost:5173/admins");
    cy.wait("@adminList?page=1?email_like=");

    cy.get("div.rdt_TableBody").children().should("have.length", 10);

    cy.get("div.rdt_TableBody").children().first().children().last().click();
    cy.contains("Remove Administator");

    cy.contains("Delete").click();
    cy.wait("@deleteAdmin");
    cy.contains("Remove Administator").should("not.exist");
    cy.wait("@adminList?page=1?email_like=");
  });
});
