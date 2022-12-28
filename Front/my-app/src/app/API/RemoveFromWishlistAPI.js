import axios from "axios";

const URL = "https://finalbackrender.onrender.com/RemoveFromWishlist/";

export function RemoveItemFromWishlist(data) {
  console.log(data)
  return new Promise((resolve) =>
    axios.delete(URL,
        {
            headers:{
                Authorization:`Bearer ${data.Token}`,
            },
            data: {
              prod_id:data.prod_id,
              user_id:data.userID
            }
        }).then((res) => resolve({ data: res.data }))
  );
}