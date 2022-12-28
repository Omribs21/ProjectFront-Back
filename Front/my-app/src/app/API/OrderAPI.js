import axios from "axios";

const URL = "https://finalbackrender.onrender.com/addOrder/";

export function sendOrders(myCart,token) {
  console.log(myCart,token);
  return new Promise((resolve) =>
    axios.post(URL, myCart,
        {
            headers:{
                Authorization:`Bearer ${token}`,
            },
        }).then((res) => resolve({ data: res.data }))
  );
}