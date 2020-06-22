// Copyright (c) 2020 Clément Dandrieux
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const debug = require('debug')
const path = require('path')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')

const settings = require('./settings')
const DB = require('./database/api')


debug.enable('backend*')


const server = jsonServer.create()
const router = jsonServer.router(settings.database.path)

const middlewares = jsonServer.defaults({
    static: path.join(__dirname, 'public')
})

const database = DB(settings.database.path)

const logger = {

    // Generalist loggers
    debug: debug('backend:debug'),
    info: debug('backend:info'),
    warn: debug('backend:warn'),
    error: debug('backend:error'),

    // Specific ones
    auth: debug('backend:auth')
}

const {
    authenticate,
    protect
} = require('./jwt')({
    settings,
    database,
    logger: logger.auth
})

server.post('/api/users/authenticate', bodyParser.json(), authenticate)

server.use(middlewares)


if(settings.protect){
    server.use(protect)
}


server.post('/upload', fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}), (req, res) => {
    const file = req.files.file

    file.mv(path.join(__dirname, 'public', settings.uploadPath, file.name), err => {

        if(err){
            logger.error(err)
            return res.sendStatus(500)
        }

        const url = path.join(settings.uploadPath, file.name)

        logger.info('File uploaded : '+url)

        res.json({
            url
        })
    })
})

server.get('/api/users/me', (req, res) => {
    res.json({...req.user})
})

server.use('/api', router)

server.use('*', (req, res) => {
    res.status(404).send()
})
server.listen(settings.port, () => {
    logger.info('Backend is running on port '+settings.port)
})
