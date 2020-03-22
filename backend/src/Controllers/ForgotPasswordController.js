const config = require("config");
const nodemailer = require("nodemailer");

var bcrypt = require("bcryptjs");
const crypto = require("crypto");

const { User } = require("Models");
const forgotPassword = async (req, res, next) => {
  //checking user
  const { username } = req.body;
  let msg = [];
  if (!username) {
    msg.push("Username is required");
  }
  if (!username) {
    res.status(404);
    res.json({
      code: 401,
      data: {
        msg
      },
      success: false
    });
    return;
  }

  let user = await User.findOne({ username });
  if (!user) {
    res.status(401);
    res.json({
      code: 403,
      data: {
        message: "User is not found in database"
      },
      success: false
    });
    return;
  }
  const token = crypto.randomBytes(20).toString("hex");
  await User.findByIdAndUpdate(
    { _id: user._id },
    { resetPasswordToken: token },
    { resetPasswordExpires: Date.now() + 3600000 }
  );
  //node-mailer,
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
        console.log("Mail is Verifyed...");
      }
    } catch (error) {
      if (error) {
        console.log("somthing Wrong with Your Authentication", err);
      }
    }
  });

  var mail = {
    from: config.get("user"),
    to: username,
    subject: "Link To Reset Password",
    text:
      "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
      `http://localhost:3000/reset/${token}\n\n` +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n"
  };

  //sending mail
  transporter.sendMail(mail, (err, data) => {
    try {
      if (data) {
        res.status(200);
        return res.json({
          success: true,
          message: "Kindly Check Your Email for  further instructions",
          data: data
        });
      } else {
        res.status(404);
        return res.json({
          success: false,
          message: "message Could not send",
          err: err
        });
      }
    } catch (error) {
      res.status(404);
      return res.json({
        success: false,
        message: "Somthigng Went Wrong",
        err: error
      });
    }
  });
};

const gettoken = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    return res.status(400).send({
      errors: [{ title: "Invalid token!", detail: "User does not exist" }]
    });
  } else {
    res.send("User is found ");
  }
  res.json("reset");
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      resetPasswordToken: token
    });
    if (!user) {
      return res.status(422).send({
        errors: { title: "Invalid token!", detail: "User does not exist" }
      });
    }
    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hashSync(req.body.newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    user.save(err => {
      if (err) {
        return res.status(404).send({
          message: err
        });
      }
      res.json({
        code: 200,
        message: "YOUR PASSWORD IS RESET SUCCESSFLLY"
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
  gettoken
};
