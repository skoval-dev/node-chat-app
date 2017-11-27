let is_real_string = (str) => {
    "use strict"
    return typeof str === "string" && str.trim().length > 0;
}

module.exports = {
    is_real_string
}