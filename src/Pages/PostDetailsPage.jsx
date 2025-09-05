import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSinglePostApi } from '../Services/PostSevice';
import PostCard from '../Components/PostCard';
import LoadingScreen from '../Components/LoadingScreen';

const PostDetailsPage = () => {
      let {id}=useParams()

      const[post,setPost]=useState(null);

   async function getPost() {
    const response=await getSinglePostApi(id)
    if(response.message){
        setPost(response.post)
    };
    
   }
   useEffect(()=>{
    getPost()
   },[])



    return (
        <>
        <div className='w-4/6 mx-auto '>
          {post ?<PostCard post={post} commentLimit={post.comments.length} callback={getPost}/>:<LoadingScreen/>} 
          </div>
        </>
    );
}

export default PostDetailsPage;
