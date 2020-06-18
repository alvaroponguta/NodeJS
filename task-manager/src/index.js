const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

/* app.use((req, res, next) =>
    res.status(503).send('Site is currently down. Check back soon!')
); */

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, _ => {
    console.log('Server is up in port', port);
})
