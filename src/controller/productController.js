const db = require('../configs/ConDB')
const uuid = require("uuid")
const fs = require('fs');

exports.getProduct = async (req, res) => {
    try {
        res.status(200).json({ message: 'product route' })
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
exports.uploadImage = async (req, res) => {
    const id = uuid.v4()
    let filename = req.file.path
    let file = filename.replace(/\\/g, '/');
    // console.log('===>',file);
    await db(`INSERT INTO i mages (id,product_image) VALUES (?,?) `, [id, file],
        (error, result) => {
            if (error) {
                return res.status(404).json(error)
            }
            return res.status(201).json(result)
        })
}
exports.getImage = async (req, res) => {
    try {
        await db(`SELECT * FROM images`, (error, data) => {
            if (error) throw new Error('select data image error')
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
exports.uploadArrayImages = (req, res) => {
        var id = uuid.v4()
        const files = req.files
        files.forEach(function (file) { 
            // console.log();
            let filename = fs.readFileSync(file.path)
            var fileUrl = filename.toString().replace(/\\/g, '/');
            // console.log(fileUrl, id);
            let insert =  "INSERT INTO images (id,product_image) VALUES (?,?)"
            db(insert, [id, fileUrl], (error, result) => {
                if (error) {
                    return res.status(404).json(error)
                }
                 return res.status(201).json(result)
            })
        })
         res.status(201).json({message:"upload image multiple success"})
}
exports.document = async (req, res) => {
    try {
        const id = uuid.v4();
        const file = req.file.path
        const fileReplace = file.replace(/\\/g, '/')
        console.log(file, fileReplace);
        // res.status(201).json()
        const query = "INSERT INTO tb_document (id, document) VALUES (?,?)"
        await db(query, [id, fileReplace], (error, result) => {
            if (error) {
                return res.status(404).json({message: error.message})
            }
            return res.status(200).json(result)
        })
        return res.status(201).json({message: 'create document successfully...!'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


