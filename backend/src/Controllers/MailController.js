const nodemailer = require("nodemailer");
const config = require("config");
const { handleError } = require("Helper");

var transport = {
  service: "Gmail",
  auth: {
    user: config.get("user"),
    pass: config.get("password")
  }
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((err, success) => {
  try {
    if (success) {
      console.log("Authentication is Valid...");
    }
  } catch (error) {
    if (error) {
      console.log("somthing Wrong with Your Authentication", err);
    }
  }
});

const SendMail = async (req, res, next) => {
  let message = "You are receiving Your Request,.\n\n";

  const errorMessage = [];

  const { patientEmail, hospitalEmail } = req.body;

  if (!patientEmail) {
    errorMessage.push("PatientEmailid Is Undefine");
  }
  if (!hospitalEmail) {
    errorMessage.push("HospitalEmailid is not Define");
  }

  if (!patientEmail || !hospitalEmail) {
    res.status(404);
    res.json({
      code: 401,
      data: {
        errorMessage
      },
      success: false
    });
    return;
  }

  try {
    const patientmail = patientEmail;
    const hospitalmail = hospitalEmail;
    var mail = {
      from: patientmail,
      to: hospitalmail,
      subject: "Here Is Your Mail",
      text: message
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.status(400);
        return res.json({
          success: false,
          message: "message Could not send",
          err: err
        });
      } else {
        res.status(200);
        return res.json({
          success: true,
          data: { data, message: "mail Send Successfully" }
        });
      }
    });
  } catch (err) {
    handleError(err);
    res.status(400);
    return res.json({
      success: false,
      error: err
    });
  }
};

module.exports = {
  SendMail
};
