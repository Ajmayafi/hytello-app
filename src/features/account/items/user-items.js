

export const statesList = [
    "Abuja",
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara"
]




const handleRegister = async (req, res) => {
    const { email, firstName, lastName, phoneNumber, id, address, bvn, nationalId, state, city, dob, gender } = req.body;
   var token
   
   const url = 'https://kuda-openapi-uat.kudabank.com/v2.1'
   try {
   const tokenReq = await fetch("https://kuda-openapi-uat.kudabank.com/v2/Account/GetToken", {
    method: 'post',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: "ajamilkt@gmail.com",
      apiKey: "MlWje7YUASZf1VoH6E3m"
    })
  })

  const tokenData = await tokenReq.json()
  token = tokenData

  console.log(token)
// 
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    kuda_ref: uniqid(),
    state: state,
    city: city,
    address: address,
    bvn: bvn,
    nationalId: nationalId,
    dob: dob,
    gender: gender
  })

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  const userInfo = docSnap.data()
  
   const cUser = await fetch('https://kuda-openapi-uat.kudabank.com/v2.1', {
        headers: {
            'Content-Type': 'application/json',
             Authorization: `bearer ${token}`,
           },
        method: 'post',
        authorization: 'Bearer ',
        body: JSON.stringify({
                serviceType: "ADMIN_CREATE_VIRTUAL_ACCOUNT",
                requestRef: `${Math.floor(Math.random() * 1000000000000 + 1)}`,
                data: {
                    email: email,
                    phoneNumber: phoneNumber,
                    lastName: lastName,
                    firstName: firstName,
                    trackingReference: userInfo.kuda_ref
                }
        })
    })
    
  const cData = await cUser.json()

  if(cData.message === "Request successful.") {
    await updateDoc(userRef, {
      verified: true,
      accountNumber: cData.data.accountNumber,
    })
  res.status(200).json(cData)

  let transporter = nodemailer.createTransport({
    host: "mail.yfobusiness.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "hello@yfobusiness.com", // generated ethereal user
      pass: "07568759@Abu", // generated ethereal password
    },
  });
  
     // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hytello ðŸ‘»" <hello@yfobusiness.com>', // sender address
    to: `${email}`, // list of receivers
    subject: `Welcome to Hytello`, // Subject line
    text: ``, // plain text body
    html: `<b>Hello ${firstName}, you are highly welcome at Hytello!, we are delighted to have you here! for any question you can always contact us at help@hytello.com.ng</b>`, // html body
  });
  console.log("Message sent: %s", info.messageId)

  }else {
    res.status(403).json(cData)
  }
   } catch(error) {
    console.log(error)
    res.status(503).json(error)
   }
}
