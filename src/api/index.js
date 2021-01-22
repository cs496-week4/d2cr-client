const { default: axios } = require("axios")

const getReviewInspectPage = (url, callback) => {
    const apiUrl = process.env.REACT_APP_API_URL + "/review";
    axios.post(apiUrl, { url: url })
    .then(url => callback(url))
}

module.exports = {
    getReviewInspectPage
}