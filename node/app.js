const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('./database/db');

//middleware
//to fill body by request
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
});
require('./database/relationships');
app.use('/api', require('./config/router'));

//Run the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    sequelize.sync({force: false}).then(() => {
        console.log("Database Connected");
    }).catch(error => {
        console.log("Database Connection Error", error);
    })
})
