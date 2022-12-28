import axios from "axios";

const URL = "https://finalbackrender.onrender.com/CleanWishlist/";

export function CleanWishlist(data) {
  console.log(data)
  return new Promise((resolve) =>
    axios.delete(URL,
        {
            headers:{
                Authorization:`Bearer ${data.Token}`,
            },
            data: {
              user_id:data.userID
            }
        }).then((res) => resolve({ data: res.data }))
  );
}