"use strict"
const { Model } = require("sequelize")
const { hashPassword } = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            username: {type : DataTypes.STRING,
              validate:{
                isEmail:{
                  msg:"Username must be in email format"
                },
              }},
            password: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [6],
                        msg: "Minimum password is 6 characters",
                    }
                },
            },
            age: {
              type: DataTypes.INTEGER,
              validate:{
                min:{
                  args:18,
                  msg:"Age cant be lower than 18"
                }
              }
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    )
    User.beforeCreate((user,options)=>{
      user.password = hashPassword(user.password)
    })
    return User
}
