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

            let info = await db.Clinics.create({
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


let handleGetAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinics.findAll();
            if (data && data.length > 0) {
                data.map((item, index) => {
                    item.image = new Buffer(item.image, "base64").toString("binary");
                    return item;
                });
            }
            console.log("Check data: ", data);
            resolve({
                errCode: 0,
                data: data,
            });
        } catch (e) {
            reject(e);
        }
    });
};


let handleGetClinicByID = (inputID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID) {
                reject({
                    errCode: 1,
                    message: "Missing parameter !",
                });
            }
            let data = await db.Clinics.findAll({
                where: {
                    id: inputID,
                },
                attributes: ["name", "address", "descriptionHTML", "descriptionMarkdown"],
                include: [
                    {
                        model: db.Doctor_Info,
                        as: "clinicData",
                        attributes: ["doctorID"],
                    }
                ]
            });
            resolve({
                errCode: 0,
                data: data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleCreateInfo,
    handleGetAllClinic,
    handleGetClinicByID
}