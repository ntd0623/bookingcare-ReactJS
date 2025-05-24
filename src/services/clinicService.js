const db = require("../models/index");

let handleCreateInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.nameClinic ||
                !data.addressClinic ||
                !data.avatar ||
                !data.contentHTML ||
                !data.contentMarkdown
            ) {
                reject({
                    errCode: 1,
                    message: "Missing parameter !",
                });
            }

            let info = await db.Clinic.create({
                name: data.nameClinic,
                address: data.addressClinic,
                descriptionHTML: data.contentHTML,
                descriptionMarkdown: data.contentMarkdown,
                image: data.avatar,
            });

            if (info) {
                resolve({
                    errCode: 0,
                    message: "Create specialty is successfully !",
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleCreateInfo
}