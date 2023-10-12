const validateUserDataFields = (req, res, next) => {
  const bodyData = req.body;
  const mandatoryFields = ["nome", "email", "senha"];

  if (!Object.keys(bodyData).length) {
    return res.status(400).json({
      message: "Todos os campos obrigatórios devem ser informados.",
    });
  }

  for (const field of mandatoryFields) {
    if (!bodyData[field]) {
      return res
        .status(400)
        .json({ message: `O campo ${field} é obrigatório!` });
    }
  }

  next();
};

const validateEmailAndPasswordFields = (req, res, next) => {
  const bodyData = req.body;
  const mandatoryFields = ["email", "senha"];

  if (!Object.keys(bodyData).length) {
    return res.status(400).json({
      message: "Todos os campos obrigatórios devem ser informados.",
    });
  }

  for (const field of mandatoryFields) {
    if (!bodyData[field]) {
      return res
        .status(400)
        .json({ message: `O campo ${field} é obrigatório!` });
    }
  }

  next();
};

module.exports = { validateUserDataFields, validateEmailAndPasswordFields };
