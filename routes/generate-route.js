const express = require("express");
const router = express.Router();
const User = require("../models/User");  // import User model
const InvalidParams = require("../errors/InvalidParams") // import Error type

// validate()
function validate(params) {
  const { name, email, age, phone } = params;
  
  // name
  if (name.length < 1)
    throw new InvalidParams("Invalid name length", "Name");

  // email
  if (email.length < 1)
    throw new InvalidParams("Invalid email length", "Email")
  else if (!email.includes("@"))
    throw new InvalidParams("Invalid email address", "Email")

  // age
  if (!Number.isInteger(Number(age)) || age < 1 || age > 100)
    throw new InvalidParams("Invalid age", "Age")

  // phone
  if (phone.length !== 12 || phone.charAt(3) != '-' || phone.charAt(7) != '-')
    throw new InvalidParams("Invalid phone", "Phone")

  const phoneNums = phone.split('-');
  if (phoneNums.length !== 3 
    || !Number.isInteger(Number(phoneNums[0])) 
    || !Number.isInteger(Number(phoneNums[1]))
    || !Number.isInteger(Number(phoneNums[2]))
  )
    throw new InvalidParams("Invalid phone values", "Phone")


  // return as-is if everything is good
  return params
}

// GET /generate-user
router.get("/", (req, res) => {
  const PORT = process.env.PORT || 3000;
  // res.render("generate-user", { port: PORT });  // for dev
  res.render("generate-user");
});

// POST /generate-user
router.post("/", async (req, res) => {
  const now = new Date(); // today

  try {
    const { name, email, age, phone, collegeStatus, coursesSelected, userInformation } = validate(req.body);
    let courses = Array.isArray(coursesSelected) ? coursesSelected : [coursesSelected];

    const newUser = new User({ 
      name, 
      email, 
      age: Number(age),
      phone,
      collegeStatus,
      coursesSelected: courses,
      userInformation  
    });
    
    console.log("All good. Ready to send!")
    const savedUser = await newUser.save();

    if (savedUser && savedUser._id) {
      console.log("User saved successfully!", savedUser);
    } else {
      console.log("User not saved for some reason.");
    }

    /*
    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
    });
    */

    res.render("confirm-user", {
      taskCompletedAt: now.toString(),
      confirmationMessageBody: `<strong>Name: </strong>${name}<br>
		                            <strong>Email Address: </strong>${email}<br>
		                            <strong>Age: </strong>${Number(age)}<br>
                                <strong>Phone: </strong>${phone}<br>
                                <strong>College Status: </strong>${collegeStatus}<br>
                                <strong>Courses Selected: </strong>${courses.join(", ")}<br>
                                <strong>Background Information:<br></strong>${userInformation}<br>`
    });

  } catch (error) {
    console.error("Error creating user:", error);
    // res.status(500).json({ error: "Internal server error", log: error });
    
    res.render("confirm-user", {
      taskCompletedAt: now.toString(),
      confirmationMessageBody: `<p>Error found in submitted form: ${error.message}</p>`
    });
  } 
});

module.exports = router;