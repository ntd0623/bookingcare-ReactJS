const db = require("../models/index");
import { raw } from "body-parser";
import { sendEmailDemo } from "./emailService";
import { v4 as uuidv4 } from 'uuid';
require("dotenv").config();

let buildEmail = (doctorID, token) => {
  let result = `${process.env.URL_REACT}/verify-booking-appointment?access_token=${token}&doctorID=${doctorID}`
  return result
}

let handleCreateInfoPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorID || !data.timeType) {
        reject({
          errCode: -1,
          message: "Missing parameter !",
        });
      } else {
        let token = uuidv4();

        await sendEmailDemo({
          reciverEmail: data.email,
          patientName: `${data.firstName} ${data.lastName}`,
          time: data.time,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildEmail(data.doctorID, token)
        });
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            roleID: "R3",
          },
        });
        if (user) {
          await db.Bookings.findOrCreate({
            where: {
              patientID: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
            defaults: {
              statusID: "S1",
              doctorID: data.doctorID,
              // date: data.date,
              // timeType: data.timeType,
              reason: data.reason,
              access_token: token
            },
          });
        }
        resolve({
          errCode: 0,
          message: "Create user success !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleVerifyBookingPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Check data: ", data)
      if (!data.doctorID || !data.access_token) {
        reject({
          errCode: -1,
          message: "Missing parameter !",
        });
      } else {
        let appointment = await db.Bookings.findOne({
          where: {
            doctorID: data.doctorID,
            access_token: data.access_token,
            statusID: "S1"
          },
          raw: false
        })
        console.log("Check appointment: ", appointment)
        if (appointment) {
          await appointment.update({
            statusID: "S2"
          })
          resolve({
            errCode: 0,
            message: "update successfully "
          })
        } else {
          resolve({
            errCode: 2,
            message: "The appointment already exists or does not exist."
          })
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}
module.exports = {
  handleCreateInfoPatient: handleCreateInfoPatient,
  handleVerifyBookingPatient: handleVerifyBookingPatient
};
