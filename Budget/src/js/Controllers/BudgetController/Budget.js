import Expense from '../../Model/Expense';
import Income from '../../Model/Income';

export default budgetController = ( _ => {
    const calculateTotal = type => {
        let sum = 0;

        data.allItems[type].forEach(cur => sum += cur.value);
        data.totals[type] = sum;
    };


    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };


    return {
        addItem: (type, des, val) => {
            let newItem;
            const ID = data.allItems[type].length > 0
                ? data.allItems[type][data.allItems[type].length - 1].id + 1
                : 0;

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);

            return newItem;
        },


        deleteItem: (type, id) => {
            let index;
            const ids = data.allItems[type].map(current => current.id);

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },


        calculateBudget: _ => {
            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.totals.inc - data.totals.exp;
            data.percentage = data.totals.inc > 0
                ? Math.round((data.totals.exp / data.totals.inc) * 100)
                : -1;
        },

        calculatePercentages: _ => {
            data.allItems.exp.forEach(cur => {
               cur.calcPercentage(data.totals.inc);
            });
        },


        getPercentages: _ => {
            return data.allItems.exp.map(cur => cur.getPercentage());
        },


        getBudget: _ => {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        }
    };

})();