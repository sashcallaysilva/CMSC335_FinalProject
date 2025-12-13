const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const PORT = process.env.PORT || 3000;
  res.render("phone-verification", { port: PORT });
});

// form submitted - now we ask the API: 
router.post("/", async (req, res) => {
  const now = new Date(); // enjoy right now, today
  try {
    let {intl, phone} = req.body;
    const response = await fetch('https://phoneintelligence.abstractapi.com/v1/?api_key='+process.env.PHONE_API+'&phone='+intl.toString()+phone.toString());
    const result = await response.json();
    const validity = result.phone_validation.is_valid;
    const formatted = result.phone_format.national;
    const c_name = result.phone_location.country_name;
    const c_region = result.phone_location.region;
    const c_city = result.phone_location.city;

    res.render("phone-verified", {
      taskCompletedAt: now.toString(),
      verifiedBody: `<strong>Is this phone number valid? </strong>${validity? "Yes":"No"}<br>
		                            <strong>Phone Number: </strong>${formatted}<br>
                                <strong>Country: </strong>${c_name}<br>
                                <strong>Region: </strong>${c_region}<br>
                                <strong>City:<br></strong>${c_city}<br>`
    });

  } catch (error) {
      console.error('Phone verification error:', error);
      res.render("phone-verified", {
        taskCompletedAt: now.toString(),
        verifiedBody: `<p>The API encountered an error: ${error.message}</p><br>
        <p><i>Error code: ${error.code}</i></p>`
      });
  }
});

module.exports = router;
