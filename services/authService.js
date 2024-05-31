const axios = require("axios");
const accessTokenConfig = require("../config/accessTokenConfig");

const getAccessToken = async()=>{
    try {

        const {username,password} = accessTokenConfig;
        const credentials = {username,password};
        const getToken = await axios.post(process.env.TOKEN_DOMAIN, credentials);
        return getToken.data.Token;
    } catch (error) {
        throw new Error(`Error getting access token: ${error.message}`);
    }
}

module.exports = getAccessToken;
