import axios from "axios";

export async function getAllPostApi() {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts',
            {
                headers: {
                    token: localStorage.getItem('token')

                },
                params: {
                    limit: 15,
                    sort: '-createdAt'

                }
            }
        )
        console.log(data);
        return data
    }
    catch {
        console.log(err);
    }


}




export async function getSinglePostApi(id) {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts/' + id,
            {
                headers: {
                    token: localStorage.getItem('token')

                },
            }
        )
        console.log(data);
        return data
    }
    catch {
        console.log(err);
    }


}

export async function creatCommenPostApi(formData) {

    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/posts'
            , formData,
            {
                headers: {
                    token: localStorage.getItem('token')

                }
            }
        )
        console.log(data);
        return data
    }
    catch (err) {
        console.log(err)

    }

}






export async function updatePostApi(formData, postId) {
  try {
    const { data } = await axios.put(
      'https://linked-posts.routemisr.com/posts/'+ postId,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}



