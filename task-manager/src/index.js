const app = require('./app');
const port = process.env.PORT;

app.listen(port, _ => {
    console.log('Server is up in port', port);
})
