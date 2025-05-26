require("dotenv").config();
const nodemailer = require("nodemailer");

let sendEmailDemo = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from: '"Bệnh Viện Đa Khoa Đô Học IT" <thanhdo062305@gmail.com>',
        to: dataSend.reciverEmail,
        subject: subjectLanguage(dataSend.language),
        html: htmlBodyLanguage(dataSend),
    });
};
let sendEmailInvoice = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from: '"Bệnh Viện Đa Khoa Đô Học IT" <thanhdo062305@gmail.com>',
        to: dataSend.email,
        subject: subjectLanguageInvoice(dataSend.language),
        html: htmlBodyLanguageInvoice(dataSend),
        attachments: [
            {
                filename: `perscription.png`,
                content: dataSend.image.split("base64,")[1],
                encoding: "base64"
            }
        ]
    });
};


let htmlBodyLanguageInvoice = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `
        <p>👋 Xin chào <strong>${dataSend.patientName}</strong>,</p>
        <p>✅ Bạn đã hoàn tất khám bệnh với thông tin như sau:</p>
        <ul>
            <li>👤 <strong>Tên bệnh nhân:</strong> ${dataSend.patientName}</li>
            <li>📧 <strong>Email:</strong> ${dataSend.email}</li>
            <li>💬 <strong>Lý do khám:</strong> ${dataSend.reason}</li>
            <li>📅 <strong>Ngày khám:</strong> ${dataSend.date}</li>
            <li>👨‍⚕️ <strong>Bác sĩ:</strong> ${dataSend.doctorName}</li>
            <li>⏰ <strong>Ca khám:</strong> ${dataSend.time}</li>
            <li>💵 <strong>Giá khám:</strong> ${dataSend.price} VNĐ</li>
        </ul>
        <p>🧾 Hóa đơn và đơn thuốc đã được đính kèm. Bạn có thể ra nhà thuốc gần nhất để có thể mua theo hướng dẫn của bác sĩ.</p>
        <p>📞 Nếu cần hỗ trợ thêm, vui lòng liên hệ <strong>hotline: 0981 321 319</strong>.</p>
        <p>Trân trọng,<br><strong>🏥 Bệnh Viện Đa Khoa Đô Học IT</strong></p>
        `;
    } else {
        result = `
        <p>👋 Dear <strong>${dataSend.patientName}</strong>,</p>
        <p>✅ Your medical consultation has been completed with the following details:</p>
        <ul>
            <li>👤 <strong>Patient Name:</strong> ${dataSend.patientName}</li>
            <li>📧 <strong>Email:</strong> ${dataSend.email}</li>
            <li>💬 <strong>Reason:</strong> ${dataSend.reason}</li>
            <li>📅 <strong>Date:</strong> ${dataSend.date}</li>
            <li>👨‍⚕️ <strong>Doctor:</strong> ${dataSend.doctorName}</li>
            <li>⏰ <strong>Time:</strong> ${dataSend.time}</li>
            <li>💵 <strong>Fee:</strong> ${dataSend.price} VND</li>
        </ul>
        <p>🧾 Your invoice and prescription are now available. Please visit the nearest pharmacy to obtain your medications as per the doctor's instructions..</p>
        <p>📞 If you need further assistance, please contact our <strong>hotline: 0981 321 319</strong>.</p>
        <p>Sincerely,<br><strong>🏥 Do Hoc IT General Hospital</strong></p>
        `;
    }
    return result;
};

let subjectLanguageInvoice = (language) => {
    let result = "";
    if (language === 'vi') {
        result = "Xác Nhận Hóa Đơn Và Đơn Thuốc"
    } else {
        result = "Confirm Invoice And Perscription";
    }
    return result
}

let htmlBodyLanguage = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `
        <p>Xin chào <strong>[${dataSend.patientName}]</strong>,</p>
    <p>Bạn đã đặt lịch khám bệnh thành công với thông tin như sau:</p>
    <ul>
      <li><strong>Bác sĩ:</strong> [${dataSend.doctorName}]</li>
      <li><strong>Chuyên khoa:</strong> [Chuyên khoa]</li>
      <li><strong>Thời gian khám:</strong> [${dataSend.time}]</li>
    </ul>
    <p>Vui lòng đến đúng giờ và mang theo giấy tờ tùy thân để hoàn tất thủ tục.</p>
    <p>Nếu thông tin trên là đúng, vui lòng <a href="${dataSend.redirectLink}">nhấn vào đây</a> để xác nhận.</p>
    <p>Nếu cần hỗ trợ, liên hệ <strong>hotline: 0981 321 319</strong>.</p>
    <p>Trân trọng,<br>Bệnh Viện Đa Khoa Đô Học IT</p>
        `;
    } else {
        result = `
    <p>Dear <strong>[${dataSend.patientName}]</strong>,</p>
<p>Your medical appointment has been successfully booked with the following details:</p>
<ul>
  <li><strong>Doctor:</strong> [${dataSend.doctorName}]</li>
  <li><strong>Department:</strong> [Specialty]</li>
  <li><strong>Appointment Time:</strong> [${dataSend.time}]</li>
</ul>
<p>Please arrive on time and bring your identification documents to complete the check-in procedure.</p>
<p>If the information above is correct, please <a href="${dataSend.redirectLink}">click here</a> to confirm.</p>
<p>If you need assistance, please contact our <strong>hotline: 0981 321 319</strong>.</p>
<p>Sincerely,<br>Do Hoc IT General Hospital</p>
    `
    }
    return result
};

let subjectLanguage = (language) => {
    let result = "";
    if (language === 'vi') {
        result = "Xác nhận lịch khám bệnh"
    } else {
        result = "Medical Appointment Confirmation";
    }
    return result
}

module.exports = {
    sendEmailDemo,
    sendEmailInvoice
};
