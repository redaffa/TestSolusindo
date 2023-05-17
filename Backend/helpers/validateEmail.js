const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

 function isContainNumberAlphabetAndCapital(value) {
    let isNumberExist = false
    let isCapitalExist = false

    for (let i = 0; i < value.length; i++) {
        if (
            typeof Number(value[i]) === "number" &&
            !isNaN(Number(value[i]))
        ) {
            isNumberExist = true
        }
        if (value[i].toUpperCase() === value[i] && isNaN(Number(value[i]))) {
            console.log(isNaN(Number(value[i])))
            isCapitalExist = true
        }
    }
    if (!isCapitalExist || !isNumberExist) {
        return false
    }
    return true
}
module.exports={validateEmail,isContainNumberAlphabetAndCapital}