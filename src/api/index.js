const { default: axios } = require("axios")

const headers = {
  "Content-Type": "application/json",
};


const getReviewInspectPage = (url, callback) => {
    const apiUrl = process.env.REACT_APP_API_URL + "/review";

    axios
      .post(apiUrl, { url: url }, { headers: headers })
      .then((res) => {
        console.warn(url);
        callback(url);
      })
      .catch((e) => console.error(e));
}

const hello = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/hello")
      .then((res) => {
        console.warn(res.data);
      })
      .catch((e) => console.error(e));

}


module.exports = {
  getReviewInspectPage,
  hello,
};