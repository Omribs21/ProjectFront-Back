import axios from "axios";

const URL = "https://finalbackrender.onrender.com/addOrder/";

export function AddOrder(data) {
  console.log(data)
  return new Promise((resolve) =>
    axios.post(URL, data,
        {
            headers:{
                Authorization:`Bearer ${data.Token}`,
            },
        }).then((res) => resolve({ data: res.data }))
  );
}