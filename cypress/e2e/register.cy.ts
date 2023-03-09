const registerpage = "http://localhost:8081/auth/signup";

describe("Register Page", () => {
  it("Testing Register Button", () => {
    cy.visit(registerpage);
    cy.viewport(1280, 720);
    cy.wait(500);
    cy.get("#username").type("username", { force: true });
    cy.wait(500);
    cy.get("#email").type("usertest@gmail.com", { force: true });
    cy.wait(500);
    cy.get("#password").type("123soleil", { force: true });
    cy.wait(500);
    cy.get("#confirm-password").type("123soleil", { force: true });
    cy.get('[type="submit"] > .w-full').click();
  });
});
