import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-blog-b77e1-default-rtdb.firebaseio.com"
})

instance.defaults.headers.common['SOMETHING'] = 'SOMETHING'

export default instance