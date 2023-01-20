const jwt = require("jsonwebtoken");
const JWT_SECRET = "GautamRaju@1234";

const fetchuser = (req, res, next) => {
    // Get the user from jwt token and append it to the req obj
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send("please authenticate using a valid token");
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user
        next();
    } catch (error) {
        res.status(401).send({error : "please authenticate using a valid token"});
    }
  

}



module.exports = fetchuser;