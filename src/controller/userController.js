const ConnDB = require('../configs/ConDB')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

exports.getUser = async (req, res) => {
    try {
        const { name, lastname, age, status } = req.body
        const users = await ConnDB("INSERT INTO `user`(`name`,`lastname`,`age`,`status`) VALUES(?,?,?,?)", [name, lastname, age, status]);
        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({ message: 'server error' })
    }
};
exports.selectUser = async (req, res) => {
    try {
        const users = await ConnDB("SELECT * FROM user")
        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
exports.selectOneUser = async (req, res) => {
    try {
        const userID = req.params.id;
        const users = await ConnDB("SELECT * FROM user WHERE id = ?", [userID])
        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
exports.register = async (req, res) => {
    const id = uuid.v4()
    try {
        const { name } = req.body
        const password = await bcrypt.hash(req.body.password, 10)
        const filename = req.file.path
        const file = filename.replace(/\\/g, '/');
         await ConnDB('INSERT INTO users (id,name, password, profile) VALUES (?,?,?,?)', [id, name, password, file], (error, data) => {
             if (error) return res.status(404).json({ message: 'create user error' })
             return res.status(201).json(data)
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}