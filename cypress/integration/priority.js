
const dropDown = (label)=>(value) =>{
    cy.get("label")
        .contains(label)
        .parent()
        .find("select")
        .select(value);
};

const formElements = {
      age:              dropDown("Age")
    , malignancy:       dropDown("Malignancy")
    , clinicalFrailty:  dropDown("Clinical Frailty")
};


function fillForm(value)  {
    for(const field in value){
        var element = formElements[field];
        if (!element) continue;
        element(value[field]);
    }
}

context("Landing page", () => {
    before(() => {
        cy.visit("http://localhost:1234/#/priority");
    });


    it("Elderly get a 3", () => {
        fillForm({ 
              age: "> 75 years"
            , malignancy: "No"
            , clinicalFrailty: "2 - Well"
        });
        cy.get(".priority-score").contains("Priority Score: 3");
    });
});