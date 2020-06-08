/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/BudgetApp.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/BudgetApp.js":
/*!*****************************!*\
  !*** ./src/js/BudgetApp.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Controllers_BudgetController_Budget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controllers/BudgetController/Budget */ \"./src/js/Controllers/BudgetController/Budget.js\");\n/* harmony import */ var _Controllers_UIController_UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controllers/UIController/UI */ \"./src/js/Controllers/UIController/UI.js\");\n\n\n\nconst controller = ((budgetController, UIController) => {\n\n    const setupEventListeners = _ => {\n        const DOM = UIController.getDOMstrings();\n\n        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);\n\n        document.addEventListener('keypress', event => {\n            if (event.keyCode === 13 || event.which === 13) {\n                ctrlAddItem();\n            }\n        });\n\n        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);\n\n        document.querySelector(DOM.inputType).addEventListener('change', UIController.changedType);\n    };\n\n\n    const updateBudget = _ => {\n        let budget;\n\n        budgetController.calculateBudget();\n        budget = budgetController.getBudget();\n\n        UIController.displayBudget(budget);\n    };\n\n\n    const updatePercentages = _ => {\n        let percentages;\n\n        budgetController.calculatePercentages();\n        percentages = budgetController.getPercentages();\n\n        UIController.displayPercentages(percentages);\n    };\n\n\n    const ctrlAddItem = _ => {\n        var newItem;\n        const input = UIController.getInput();\n\n        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {\n            newItem = budgetController.addItem(input.type, input.description, input.value);\n\n            UIController.addListItem(newItem, input.type);\n\n            UIController.clearFields();\n\n            updateBudget();\n\n            updatePercentages();\n        }\n    };\n\n\n    const ctrlDeleteItem = event => {\n        let splitID, type, ID;\n        const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;\n\n        if (itemID) {\n            splitID = itemID.split('-');\n            type = splitID[0];\n            ID = parseInt(splitID[1]);\n\n            budgetController.deleteItem(type, ID);\n\n            UIController.deleteListItem(itemID);\n\n            updateBudget();\n\n            updatePercentages();\n        }\n    };\n\n\n    return {\n        init: _ => {\n            UIController.displayMonth();\n            UIController.displayBudget({\n                budget: 0,\n                totalInc: 0,\n                totalExp: 0,\n                percentage: -1\n            });\n            setupEventListeners();\n        }\n    };\n\n})(_Controllers_BudgetController_Budget__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _Controllers_UIController_UI__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n\ncontroller.init();\n\n//# sourceURL=webpack:///./src/js/BudgetApp.js?");

/***/ }),

/***/ "./src/js/Controllers/BudgetController/Budget.js":
/*!*******************************************************!*\
  !*** ./src/js/Controllers/BudgetController/Budget.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Model_Expense__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Model/Expense */ \"./src/js/Model/Expense.js\");\n/* harmony import */ var _Model_Income__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Model/Income */ \"./src/js/Model/Income.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (budgetController = ( _ => {\n    const calculateTotal = type => {\n        let sum = 0;\n\n        data.allItems[type].forEach(cur => sum += cur.value);\n        data.totals[type] = sum;\n    };\n\n\n    let data = {\n        allItems: {\n            exp: [],\n            inc: []\n        },\n        totals: {\n            exp: 0,\n            inc: 0\n        },\n        budget: 0,\n        percentage: -1\n    };\n\n\n    return {\n        addItem: (type, des, val) => {\n            let newItem;\n            const ID = data.allItems[type].length > 0\n                ? data.allItems[type][data.allItems[type].length - 1].id + 1\n                : 0;\n\n            if (type === 'exp') {\n                newItem = new _Model_Expense__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ID, des, val);\n            } else if (type === 'inc') {\n                newItem = new _Model_Income__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ID, des, val);\n            }\n\n            data.allItems[type].push(newItem);\n\n            return newItem;\n        },\n\n\n        deleteItem: (type, id) => {\n            let index;\n            const ids = data.allItems[type].map(current => current.id);\n\n            index = ids.indexOf(id);\n\n            if (index !== -1) {\n                data.allItems[type].splice(index, 1);\n            }\n\n        },\n\n\n        calculateBudget: _ => {\n            calculateTotal('exp');\n            calculateTotal('inc');\n\n            data.budget = data.totals.inc - data.totals.exp;\n            data.percentage = data.totals.inc > 0\n                ? Math.round((data.totals.exp / data.totals.inc) * 100)\n                : -1;\n        },\n\n        calculatePercentages: _ => {\n            data.allItems.exp.forEach(cur => {\n               cur.calcPercentage(data.totals.inc);\n            });\n        },\n\n\n        getPercentages: _ => {\n            return data.allItems.exp.map(cur => cur.getPercentage());\n        },\n\n\n        getBudget: _ => {\n            return {\n                budget: data.budget,\n                totalInc: data.totals.inc,\n                totalExp: data.totals.exp,\n                percentage: data.percentage\n            };\n        }\n    };\n\n})());\n\n//# sourceURL=webpack:///./src/js/Controllers/BudgetController/Budget.js?");

/***/ }),

/***/ "./src/js/Controllers/UIController/UI.js":
/*!***********************************************!*\
  !*** ./src/js/Controllers/UIController/UI.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (UIController = ( _ => {\n\n    const DOMstrings = {\n        inputType: '.add__type',\n        inputDescription: '.add__description',\n        inputValue: '.add__value',\n        inputBtn: '.add__btn',\n        incomeContainer: '.income__list',\n        expensesContainer: '.expenses__list',\n        budgetLabel: '.budget__value',\n        incomeLabel: '.budget__income--value',\n        expensesLabel: '.budget__expenses--value',\n        percentageLabel: '.budget__expenses--percentage',\n        container: '.container',\n        expensesPercLabel: '.item__percentage',\n        dateLabel: '.budget__title--month'\n    };\n\n\n    const formatNumber = (num, type) => {\n        let numSplit, int, dec;\n\n        num = Math.abs(num);\n        num = num.toFixed(2);\n\n        numSplit = num.split('.');\n\n        int = numSplit[0];\n        if (int.length > 3) {\n            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);\n        }\n\n        dec = numSplit[1];\n\n        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;\n\n    };\n\n\n    const nodeListForEach = (list, callback) => {\n        for (let i = 0; i < list.length; i++) {\n            callback(list[i], i);\n        }\n    };\n\n\n    return {\n        getInput: _ => {\n            return {\n                type: document.querySelector(DOMstrings.inputType).value,\n                description: document.querySelector(DOMstrings.inputDescription).value,\n                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)\n            };\n        },\n\n\n        addListItem: (obj, type) => {\n            let html, newHtml, element;\n\n            if (type === 'inc') {\n                element = DOMstrings.incomeContainer;\n\n                html = '<div class=\"item clearfix\" id=\"inc-%id%\"> <div class=\"item__description\">%description%</div><div class=\"right clearfix\"><div class=\"item__value\">%value%</div><div class=\"item__delete\"><button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button></div></div></div>';\n            } else if (type === 'exp') {\n                element = DOMstrings.expensesContainer;\n\n                html = '<div class=\"item clearfix\" id=\"exp-%id%\"><div class=\"item__description\">%description%</div><div class=\"right clearfix\"><div class=\"item__value\">%value%</div><div class=\"item__percentage\">21%</div><div class=\"item__delete\"><button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button></div></div></div>';\n            }\n\n            newHtml = html.replace('%id%', obj.id);\n            newHtml = newHtml.replace('%description%', obj.description);\n            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));\n\n            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);\n        },\n\n\n        deleteListItem: (selectorID) => {\n            const el = document.getElementById(selectorID);\n\n            el.parentNode.removeChild(el);\n        },\n\n\n        clearFields: _ => {\n            let fieldsArr;\n            const fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);\n\n            fieldsArr = Array.prototype.slice.call(fields);\n\n            fieldsArr.forEach((current, index, array) => {\n                current.value = \"\";\n            });\n\n            fieldsArr[0].focus();\n        },\n\n\n        displayBudget: obj => {\n            const type = obj.budget > 0 ? 'inc' : 'exp';\n\n            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);\n            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');\n            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');\n\n            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage > 0\n                ? obj.percentage + '%'\n                : '---';\n        },\n\n\n        displayPercentages: percentages => {\n            const fields = document.querySelectorAll(DOMstrings.expensesPercLabel);\n\n            nodeListForEach(fields, (current, index) => {\n                current.textContent = percentages[index] > 0\n                    ? percentages[index] + '%'\n                    : '---';\n            });\n        },\n\n\n        displayMonth: _ => {\n            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];\n            const now = new Date();\n            const month = now.getMonth();\n            const year = now.getFullYear();\n\n            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;\n        },\n\n\n        changedType: _ => {\n            const fields = document.querySelectorAll(\n                DOMstrings.inputType + ',' +\n                DOMstrings.inputDescription + ',' +\n                DOMstrings.inputValue);\n\n            nodeListForEach(fields, cur => cur.classList.toggle('red-focus'));\n            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');\n        },\n\n\n        getDOMstrings: _ => {\n            return DOMstrings;\n        }\n    };\n\n})());\n\n//# sourceURL=webpack:///./src/js/Controllers/UIController/UI.js?");

/***/ }),

/***/ "./src/js/Model/Expense.js":
/*!*********************************!*\
  !*** ./src/js/Model/Expense.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Expense {\n    constructor(id, description, value) {\n        this.id = id;\n        this.description = description;\n        this.value = value;\n        this.percentage = -1;\n    };\n};\n\n\nExpense.prototype.calcPercentage = function(totalIncome) {\n    if (totalIncome > 0) {\n        this.percentage = Math.round((this.value / totalIncome) * 100);\n    } else {\n        this.percentage = -1;\n    }\n};\n\n\nExpense.prototype.getPercentage = function() {\n    return this.percentage;\n};\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Expense);\n\n//# sourceURL=webpack:///./src/js/Model/Expense.js?");

/***/ }),

/***/ "./src/js/Model/Income.js":
/*!********************************!*\
  !*** ./src/js/Model/Income.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Income; });\nclass Income {\n    constructor(id, description, value) {\n        this.id = id;\n        this.description = description;\n        this.value = value;\n    }\n}\n\n//# sourceURL=webpack:///./src/js/Model/Income.js?");

/***/ })

/******/ });