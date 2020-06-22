// Copyright (c) 2020 Clément Dandrieux
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const util = require('util')

const jwt = require('jsonwebtoken')

const jwtP = {
    sign: util.promisify(jwt.sign),
    verify: util.promisify(jwt.verify)
}

const parseBasicAuth = header => {
    const b64auth = header.split(' ')[1] || ''
    const strauth = Buffer.from(b64auth, 'base64').toString()
    const [_, login, password] = strauth.match(/(.*?):(.*)/) || []
    return {login, password}
}

module.exports = ({
    settings,
    logger,
    database
}) => ({
    authenticate: (req, res) => {

        let credentials = {}

        // Parse login and password from headers if present & basic auth
        if(req.headers.authorization && req.headers.authorization.startsWith('Basic')){
            credentials = parseBasicAuth(req.headers.authorization)
        } else if(req.body.login && req.body.password){
            credentials = req.body
        }

        if(!credentials.password || !credentials.login){
            return res.status(403).json({
                code: 403,
                status: 'error',
                message: 'Missing credentials'
            })
        }
        
        database.getUserByLogin(credentials.login)
            .then((user) => {

                if(!user){
                    let err = new Error('Can\'t find user for login : '+credentials.login)
                    err.httpCode = 403
                    throw err
                }

                const {password, ...publicUser} = user
                
                if(credentials.password !== password){
                    let err = new Error('Bad password for user '+user.id)
                    err.httpCode = 403
                    throw err
                }

                return jwtP.sign({
                    user: publicUser
                }, settings.security.privateKey, {
                    algorithm: settings.security.algorithm
                })
                .then(token => ({
                    token,
                    user: publicUser
                }))
                .catch(() => {
                    let err = new Error('Unable to generate token...')
                    err.httpCode = 500
                    throw err
                })

            })
            .then(data => {
                logger('Generated token for user '+data.user.id)
                return res.json(data)
            })
            
            .catch(err => {

                logger(err.message)
                return res.status(err.httpCode).json({
                    code: err.httpCode,
                    status: 'error',
                    message: err.message
                })
            
        })
    
    },

    protect: (req, res, next) => {
        Promise.resolve(req.headers.authorization)
            .then(authStr => {
                if(!authStr){
                    throw new Error('Missing Authorization header')
                }
    
                if (!authStr.startsWith('Bearer ')) {
                    throw new Error('Missing Bearer token')
                }
    
                return authStr.slice(7, authStr.length)
            })
            .then((token) => jwtP.verify(token, settings.security.privateKey, {
                algorithm: settings.security.algorithm
            }))
            .then(decoded => {
                if(!decoded.user){
                    logger('Badly formatted but valid token... Are you playing ?')
                    throw new Error('Invalid token')
                }
    
                req.user = decoded.user
                logger('User '+req.user.id+' fetched '+req.path)
                next()
            })
            .catch(err => {
                logger('Failed authentication : '+err.message)
                res.status(401)
                    .json({
                        status: 'error',
                        code: 401,
                        message: err.message
                    })
            })
    }
})
