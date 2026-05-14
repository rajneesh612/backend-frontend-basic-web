const validateUser = (req, res, next) => {

  const { name } = req.body;

  if (!name) {

    return res.status(400).json({
      message: "Name is required"
    });

  }

  const nameRegex = /^[a-zA-Z ]+$/;

  if (!nameRegex.test(name)) {
    return res.status(400).json({
      message: "Name can only contain letters and spaces"
    });
  } 

  next();

};

module.exports = validateUser;