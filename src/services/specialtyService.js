const db = require("../models/index");

let handleCreateInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.nameSpecialty || !data.avatar || !data.contentHTML || !data.contentMarkdown) {
                reject({
                    errCode: 1,
                    message: "Missing parameter !"
                })
            }

            let info = await db.Specialty.create({
                name: data.nameSpecialty,
                descriptionHTML: data.contentHTML,
                descriptionMarkdown: data.contentMarkdown,
                image: data.avatar
            })

            if (info) {
                resolve({
                    errCode: 0,
                    message: "Create specialty is successfully !"
                })
            }


        } catch (e) {
            reject(e)
        }
    })
}

let handleGetAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.Specialty.findAll();
            if (data && data.length > 0) {
                data.map((item, index) => {
                    item.image = new Buffer(item.image, "base64").toString("binary");
                    return item
                })
            }
            console.log("Check data: ", data);
            resolve({
                errCode: 0,
                data: data
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleCreateInfo,
    handleGetAllSpecialty
}