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
};
