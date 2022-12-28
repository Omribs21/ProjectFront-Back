import axios from "axios";

const URL = "https://finalbackrender.onrender.com/products/";

export function getProdById(id) {
  console.log(URL + id)
  return new Promise((resolve) =>
    axios.get(URL + id).then((res) => resolve({ data : res.data}))
  );
}