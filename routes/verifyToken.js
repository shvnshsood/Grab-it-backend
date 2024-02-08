const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    //getting token in a authHeader variable
  const authHeader = req.headers.token;
  //checking if the token is correct
  if (authHeader) {
    
    //if correct split the part from the token  and get the needed one
    const token = authHeader.split(" ")[1];

    //verify jwt providing splitted token  , secret key jwt , it will return a error or user 
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        //if err then give error else return user
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      
      //check for auth
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};