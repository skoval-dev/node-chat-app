let generate_message = (from, text) => {
    "use strict"
    return {
      from: from,
      text: text,
      created_at: new Date().getTime()
    };
};

let generate_location_message = (from, lat, long) => {
    "use strict"
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        created_at: new Date().getTime()
    }
};

module.exports = {generate_message, generate_location_message}