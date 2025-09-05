import React, { useEffect, useState } from 'react';
import {Button} from "@heroui/react";
import PostCard from '../Components/PostCard';
import { getAllPostApi } from '../Services/PostSevice';
import LoadingScreen from '../Components/LoadingScreen';
import Creatpost from '../Components/Creatpost';

const FeedPage = () => {
    const[posts,setPosts]=useState([]);
    async function getAllPosts() 
    {
       const response=await getAllPostApi();
        setPosts(response.posts)  
    }
    useEffect(()=>{
       getAllPosts();
    },[])

    return (
        <>
       <div className="w-2xl mx-auto ">
        <Creatpost callback={getAllPosts}/>
       {
        
         posts.length==0?   <LoadingScreen/>:
          posts.map((post)=>  <PostCard key={post.id}  post={post} commentLimit={1} callback={getAllPosts}/> )
       }

</div>

        </>
    );
}

export default FeedPage;
