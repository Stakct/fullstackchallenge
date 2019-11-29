const   express = require('express'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        routes = require('./routes'),
        config = {
            name: 'fullstackchallenge-api',
            port: 3000,
            host: '0.0.0.0',
        },
        app = express()

app.use(bodyParser.json())
app.use(cors())

routes(app)

app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error')
    }
    console.log(`${config.name} running on ${config.host}:${config.port}`)
});
