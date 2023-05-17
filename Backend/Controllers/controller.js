const { hashPassword, checkPassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/JWT")
const { validateEmail, isContainNumberAlphabetAndCapital } = require("../helpers/validateEmail")
const {User, UsersWithScore,sequelize} = require("../models/index") 
class UserController{
    static async registerUser(req,res){
        try {
        const {username,password,age} = req.body
        
        const isEmail = validateEmail(username)
        if(!isEmail){
            throw{status:400,message:"Username must be in email format"}
        }
        if(password.length < 6){
            throw{status:400,message:"Minimum password is 6 character"}
        }
        const passwordValidation = isContainNumberAlphabetAndCapital(password)
        if(!passwordValidation){
            throw{status:400,message:"Password must contain Capital Alphabet and Number"}
        }
        const hashedPassword = hashPassword(password)
        await User.sequelize.query(`SELECT register_user('${username}','${hashedPassword}',${+age})`)

        res.status(201).json({username,password:hashedPassword,age})
        } catch (err) {
            if(err.status){
                res.status(err.status).json({message : err.message})
            }else if (err.name === "SequelizeUniqueConstraintError"){
                res.status(400).json({message:"Username not avaialable"})
            }
            else {
                res.status(500).json({message:"Internal Server Error"})
            }
        }  
    }

    static async loginUser(req,res){
        try {
            const{username,password} = req.body
            if(!username){
                throw{status:401,message:"Username is Empty"}
            }
            if(!password){
                throw{status:401,message:"Password is Empty"}
            }
            // const result = await User.sequelize.query(`Select get_user_by_username('${username}')`) // return data yang dibalikkan terlalu amburadul sehingga saya tidak bisa melanjutkannya menggunakan stored procedure
            const user = await User.findOne({
                where:{
                    username
                }
            })
            if(!user){
                throw{status:401,message:"Invalid Username/Password"}
            }
            const isPasswordValid = checkPassword(password,user.password)
            console.log(isPasswordValid)
            if(!isPasswordValid){
                throw{status:401,message:"Invalid Username/Password"}
            }
            const access_token = signToken({id : user.id})


            res.status(200).json({access_token})
        } catch (err) {
            console.log(err)
            if(err.status){
                res.status(err.status).json({message:err.message})
            }else{
                res.status(500).json({message:"Internal Server Error"})
            }
        }
    }
    static async modeUser(req,res){
        try {
            const modeUser = await UsersWithScore.sequelize.query(`SELECT name, emotion, COUNT(*) AS frequency
            FROM "UsersWithScores" uws 
            GROUP BY name, emotion
            HAVING COUNT(*) = (
              SELECT MAX(count) 
              FROM (
                SELECT name, emotion, COUNT(*) AS count
                FROM "UsersWithScores"
                GROUP BY name, emotion
              ) AS subquery
              WHERE subquery.name = uws.name
            )
            ORDER BY name;`)
            console.table(modeUser[0])
            res.status(200).json(modeUser[0])
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async averageScoreUsers(req,res){
        try {
            const averageScoresUsers = await UsersWithScore.sequelize.query(`SELECT name, AVG(score) FROM "UsersWithScores" uws 
            GROUP BY "name";`)
            console.table(averageScoresUsers[0])
            res.status(200).json(averageScoresUsers[0])
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async readModeAndAverageUserOnTheSameDate(req,res){
        try {
            const modeAndAverageUserOnTheSameDate = await UsersWithScore.sequelize.query(`WITH temp AS (
                SELECT name, emotion, AVG(score) AS average_score, COUNT(*) AS frequency,
                       ROW_NUMBER() OVER (PARTITION BY name ORDER BY COUNT(*) DESC) AS row_num,
                       MAX(created) AS max_created
                FROM "UsersWithScores"
                GROUP BY name, emotion
              )
              SELECT name, emotion, average_score, frequency, max_created as created
              FROM temp
              WHERE row_num = 1
              ORDER BY name;`)
            console.table(modeAndAverageUserOnTheSameDate[0])
            res.status(200).json(modeAndAverageUserOnTheSameDate[0])
        } catch (error) {
            res.status(500).json(err)
        }
    }
    static async getAllUser(req,res){
        try {
            const usersData = await User.findAll()

            res.status(200).json(usersData)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController