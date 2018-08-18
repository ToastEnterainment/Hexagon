const messagesPl = require("./messages/messages_pl.json");

const get = (key) => {
    //TODO: zmiana jezykow
    return messagesPl[key];
}

module.exports = {
    get: get
}

