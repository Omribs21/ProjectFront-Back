import axios from "axios";

const URL = "https://finalbackrender.onrender.com/GetOrders/";

export function GetOrders(data) {
    console.log(data)
  return new Promise((resolve) =>
    axios.get(URL, {
        headers: {
            'Authorization': `Bearer ${data.Token}`
        }}).then((res) => resolve({ data: res.data }))
    );
}