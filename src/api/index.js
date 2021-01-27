import axios from "axios";
const headers = {
  "Content-Type": "application/json",
};

export const mockCheckUrl = (url) => {
  const apiUrl = process.env.REACT_APP_API_URL + "/check";
  axios
    .get(apiUrl)
    .then((res) => {
      if (res.status === 200) return true;
      else return false;
    })
    .catch((e) => console.error(e));
};

export const getReviewInspectPage = (urlList, productUrl) => {
  const apiUrl = process.env.REACT_APP_API_URL + "/inspect";
  return axios.post(apiUrl, { urlList, productUrl }, { headers })
}

// export const getReviewInspectPage = (url, productUrl, callback) => {
//   const apiUrl = process.env.REACT_APP_API_URL + "/review";
//   axios
//     .post(apiUrl, { url: url, productUrl: productUrl }, { headers: headers })
//     .then((res) => {
//       if (res.status === Number(process.env.REACT_APP_TEAPOT)) console.error("review와 iframe을 request url에 포함하지만 리뷰 페이지는 아닌 요청");
//       callback(res.data); // res.data 를 url로 해서 새로운 탭 열기
//     })
//     .catch((e) => console.error(e));
// };

export const hello = () => {
  axios
    .get(process.env.REACT_APP_API_URL + "/hello")
    .then((res) => {
      console.warn(res.data);
    })
    .catch((e) => console.error(e));
};

export const isValidUrl = (url) => {
  const apiUrl = process.env.REACT_APP_API_URL + "/check";
  return axios
    .post(`${apiUrl}`, {
      url: url,
    }, {headers: headers})
    // .then((res) => {
    //   console.log(res.status);
    //   if (res.status === 200) return true;
    //   else return false;
    // })
    // .catch((e) => console.error(e));
};

export default {
  getReviewInspectPage,
  hello,
  isValidUrl,
};
