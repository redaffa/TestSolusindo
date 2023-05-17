const jwt = require("jsonwebtoken")
const jwtPass = "hardtoreadiguess"
const signToken = (payload)=>{
    return jwt.sign(payload,jwtPass)
}

const decodeToken = (token)=>{
    return jwt.verify(token,jwtPass)
}

module.exports={signToken,decodeToken}