const contactpage = "http://localhost:8081/contact";

describe("Contact", () => {
  it("Testing Contact Form", () => {
    cy.visit(contactpage);
    cy.viewport(1280, 720);
    cy.wait(500);
    cy.get("#full-name").type("Firstname Lastname", { force: true });
    cy.wait(500);
    cy.get("#email").type("usertest@gmail.com", { force: true });
    cy.wait(500);
    cy.get("#phone").type("0606060606", { force: true });
    cy.wait(500);
    cy.get("#ticket_type").select("0c61f7c3-4951-4b99-8091-c9e7ac8974c3", { force: true });
    cy.wait(500);
    cy.get("#message").type("Test message", { force: true });
    cy.get(":nth-child(6) > .btn-primary").click();
  });
});