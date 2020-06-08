import budgetController from './Controllers/BudgetController/Budget';
import UIController from './Controllers/UIController/UI';

const controller = ((budgetController, UIController) => {

    const setupEventListeners = _ => {
        const DOM = UIController.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', event => {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UIController.changedType);
    };


    const updateBudget = _ => {
        let budget;

        budgetController.calculateBudget();
        budget = budgetController.getBudget();

        UIController.displayBudget(budget);
    };


    const updatePercentages = _ => {
        let percentages;

        budgetController.calculatePercentages();
        percentages = budgetController.getPercentages();

        UIController.displayPercentages(percentages);
    };


    const ctrlAddItem = _ => {
        var newItem;
        const input = UIController.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            newItem = budgetController.addItem(input.type, input.description, input.value);

            UIController.addListItem(newItem, input.type);

            UIController.clearFields();

            updateBudget();

            updatePercentages();
        }
    };


    const ctrlDeleteItem = event => {
        let splitID, type, ID;
        const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            budgetController.deleteItem(type, ID);

            UIController.deleteListItem(itemID);

            updateBudget();

            updatePercentages();
        }
    };


    return {
        init: _ => {
            UIController.displayMonth();
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };

})(budgetController, UIController);


controller.init();