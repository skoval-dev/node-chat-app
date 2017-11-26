let generate_message = (from, text) => {
    "use strict"
    return {
      from: from,
      text: text,
      created_at: new Date().getTime()
    };
};

module.exports = {generate_message}