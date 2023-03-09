const loginpage = "http://localhost:8081/auth/login";

describe("Login Page", () => {
  it("Testing Login Button", () => {
    cy.visit(loginpage);
    cy.viewport(1280, 720);
    cy.wait(500);
    cy.get("#login").type("testUser", { force: true });
    cy.wait(500);
    cy.get("#password").type("123soleil", { force: true });
    cy.get('[type="submit"] > .w-full').click();
  });

  it("Testing Forgot Password Button", () => {
    cy.visit(loginpage);
    cy.viewport(1280, 720);
    cy.get(".text-sm > .font-medium").click();
    cy.url().should("include", "password/forgot");
  });

  it("Testing Register Button", () => {
    cy.visit(loginpage);
    cy.viewport(1280, 720);
    cy.get(".mt-12 > .btn-secondary").click();
    cy.url().should("include", "signup");
  });

  it("Testing Login Button with wrong password", () => {
    cy.visit(loginpage);
    cy.viewport(1280, 720);
    cy.wait(500);
    cy.get("#login").type("testUser", { force: true });
    cy.wait(500);
    cy.get("#password").type("wrongpassword", { force: true });
    cy.get('[type="submit"] > .w-full').click();
  });

  it("Testing Login Button with wrong username", () => {
    cy.visit(loginpage);
    cy.viewport(1280, 720);
    cy.wait(500);
    cy.get("#login").type("wrongusername", { force: true });
    cy.wait(500);
    cy.get("#password").type("123soleil", { force: true });
    cy.get('[type="submit"] > .w-full').click();
  });

  it("Testing Login Button with wrong username and password", () => {
    cy.visit(loginpage);
    cy.viewport(1280, 720);
    cy.wait(500);
    cy.get("#login").type("wrongusername", { force: true });
    cy.wait(500);
    cy.get("#password").type("wrongpassword", { force: true });
    cy.get('[type="submit"] > .w-full').click();
  });

  it("Testing Login Button with empty fields", () => {
    cy.visit(loginpage);
    cy.viewport(1280, 720);
    cy.wait(loginpage);
    cy.get("#login").type(" ", { force: true });
    cy.wait(500);
    cy.get("#password").type(" ", { force: true });
    cy.get('[type="submit"] > .w-full').click();
  });
});
