import { doesNotReject } from "assert";

describe("Correctly Searches", () => {

    beforeEach(() => {
        cy.visit("http://127.0.0.1:8080/");
    });

    it("Contains the correct placeholder", () => {
      cy.get('h1').should('contain', "Hello ...!");
    });

    it("Pulls back and loads data correctly", () => {
        cy.wait(500);

        cy.get('h1').should('contain', "Hello Luke Skywalker!");
    });
});