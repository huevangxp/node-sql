const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const route = require('./routes/index')
// const ConnDB = require('./configs/ConDB')

require('dotenv').config()

const port = process.env.PORT || 6666

const app = express()

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
// ConnDB()

app.use(express.json({ limit: "10mb", extended: true }))
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }))

app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
    );
    next();
});

app.use('/',route)

app.listen(port, () => {
    console.log('server runing on port '+ port);
})