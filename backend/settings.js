// Copyright (c) 2020 Clément Dandrieux
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT


const settings = {
    port: 8080,
    protect: true,
    database: {
        path: 'backend/database/db.json'
    },
    security: {
        privateKey: 'demo-private-key',
        algorithm: 'HS256'
    },
    uploadPath: '/uploads'
}

module.exports = settings