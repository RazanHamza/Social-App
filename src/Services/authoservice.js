import axios from "axios";
import { da } from "zod/locales";

export async function getUserDataApi(userdata) {
    try {
        let { data } = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        console.log(data)
        return data;
    }
    catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}

export async function sendRegisterData(userdata) {
    try {
        let { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', userdata);
        console.log(data)
        return data;
    }
    catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}


export async function sendLoginData(userdata) {
    try {
        let { data } = await axios.post('https://linked-posts.routemisr.com/users/signin', userdata);
        console.log(data)
        return data;
    }
    catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}




export async function uploadProfilePhotoApi(photoFile) {
  try {
    const formData = new FormData();
    formData.append("photo", photoFile);

    const { data } = await axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Upload success:", data);
    return data;
  } catch (err) {
    console.error("Upload error:", err.response?.data || err.message);
    throw err;
  }
}