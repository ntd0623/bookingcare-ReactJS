const specialtyService = require("../services/specialtyService");
let createInforSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.handleCreateInfo(req.body);
        return res.status(200).json(info);

    } catch (e) {
        console.log("Error: ", e);
        return res.status(200).json({
            errCode: 1,
            message: "Error from server !"
        })
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.handleGetAllSpecialty();
        return res.status(200).json(data)
    } catch (e) {
        console.log("Error: ", e);
        return res.status(200).json({
            errCode: 1,
            message: "Error from server !"
        })
    }
}

let getSpecialtyByID = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                erroCode: 2,
                message: "Missing 'id' in query parameters"
            });
        }
        let data = await specialtyService.handleGetSpecialtyByID(req.query.id, req.query.location);
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
    createInforSpecialty,
    getAllSpecialty,
    getSpecialtyByID

}