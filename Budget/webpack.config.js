const path = require('path');

module.exports = {
    entry: './src/js/BudgetApp.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    }
};