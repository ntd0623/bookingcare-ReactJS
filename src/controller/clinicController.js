const clinicService = require("../services/clinicService");

let createInfoClinic = async (req, res) => {
    try {
        let info = await clinicService.handleCreateInfo(req.body);
        return res.status(200).json(info);

    } catch (e) {
        console.log("Error: ", e);
        return res.status(200).json({
            errCode: 1,
            message: "Error from server !"
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let data = await clinicService.handleGetAllClinic();
        return res.status(200).json(data)
    } catch (e) {
        console.log("Error: ", e);
        return res.status(200).json({
            errCode: 1,
            message: "Error from server !"
        })
    }
}

let getClinicByID = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                erroCode: 2,
                message: "Missing 'id' in query parameters"
            });
        }
        let data = await clinicService.handleGetClinicByID(req.query.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log("Error: ", e);
        return res.status(200).json({
            errCode: 1,
            message: "Error from server !"
        })
    }
}

module.exports = {
    createInfoClinic,
    getAllClinic,
    getClinicByID
}
