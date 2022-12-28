import axios from 'axios'

const URL = "https://finalbackrender.onrender.com/logout/";

export function myLogout(token) {
    return new Promise((resolve) =>
    axios(URL, {
        headers: {
            'Authorization': `Bearer ${token.token}`
        }}).then((res) => resolve({ data: res.data }))
    );
}