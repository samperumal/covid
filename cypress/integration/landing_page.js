context("Landing page", () => {
    before(() => {
        cy.visit("http://localhost:1234");
    });

    it("Disclaimer is shown on first load", () => 
        cy.get("#app").contains("This website is NOT affiliated with the Western Cape Dept. of Health")
    );

    it("Button click to load scoring form", () => {
        cy.get(".button")
            .contains("Begin Priority Scoring")
            .click();
        
        cy.get(".title").contains("Age and Function");
    });
});