import axios from "axios";

const URL = "https://finalbackrender.onrender.com/AddToWishlist/";

export function AddToWishlist(data) {
  console.log(data)
  const newData = {prod_id:data.prod_id,Token:data.Token}
  return new Promise((resolve) =>
    axios.post(URL, newData,
        {
            headers:{
                Authorization:`Bearer ${data.Token}`,
            },
        }).then((res) => resolve({ data: res.data }))
  );
}