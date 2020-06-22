// Copyright (c) 2020 Clément Dandrieux
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const fsp = require('fs').promises

function DB(path){

    return {

        readDB(){
            return fsp.readFile(path)
                .then(content => JSON.parse(content))
        },

        get(table){
            return this.readDB()
                .then(data => data[table])
        },

        getUserByLogin(login){
            return this.get('users')
                .then(list => list.find(({email}) => login === email))
        }
    }
}

module.exports = DB