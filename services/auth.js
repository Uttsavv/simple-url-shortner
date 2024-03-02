const uuidToUserMap = new Map();

const setUser = (id, user) => {
    uuidToUserMap.set(id, user);
};

const getUser = (id) => {
    return uuidToUserMap.get(id);
};

module.exports = {
    setUser,
    getUser,
};
