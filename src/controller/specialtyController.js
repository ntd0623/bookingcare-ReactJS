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


module.exports = {
    createInforSpecialty,
    getAllSpecialty
}