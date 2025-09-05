import React, { useState } from 'react';
import { Button, Spinner } from '@heroui/react';
import { creatCommenPostApi} from '../Services/PostSevice';
import { updatePostApi } from '../Services/PostSevice';

const CreatePost = ({ callback,post,isUpdating,setIsUpdating }) => {
    const [postBody, setPostBody] = useState(post?.body?? '');
    const [postImage, setPostImage] = useState('');
    const [postImageUrl, setPostImageUrl] = useState( '');
    const [loading, setLoading] = useState(false);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPostImage(file);
            setPostImageUrl(URL.createObjectURL(file));
        }
        e.target.value = '';
    };

    const handelSubmit= async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('body', postBody);

        if (postImage) {
            formData.append('image', postImage);
        }

        let response;
       
        try {
             if (isUpdating) {
                response = await updatePostApi(formData,post.id)
        }
        else{
              response = await creatCommenPostApi(formData);
        }
            if (response?.message) {
                callback();
                setPostBody('');
                setPostImageUrl('');
                setPostImage(null);
                setIsUpdating(false)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white w-full rounded-md shadow-md h-auto overflow-hidden py-3 px-3 my-5 relative">
            <form onSubmit={handelSubmit}>
                <textarea
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    className="border w-full p-4 rounded-md resize-none bg-gray-100"
                    placeholder="Create Post, What's on Your Mind"
                    rows={4}
                />
                {postImageUrl && (
                    <div className="relative">
                        <img src={postImageUrl} className="w-full mb-4" alt="Uploaded" />
                        <svg
                            onClick={() => {
                                setPostImageUrl('');
                                setPostImage(null);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 absolute top-4 right-4 cursor-pointer"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <label className="cursor-pointer hover:text-blue-500">
                        <input
                            onChange={handleImage}
                            type="file"
                            className="border hidden"
                        />
                        <span>Image</span>
                    </label>
                    
                    {isUpdating&&<Button  color="default" onPress={()=>setIsUpdating(false)}>
                        Cancel
                    </Button>}

                    <Button type="submit" color="primary">
                        Post
                    </Button>
                    
                </div>
            </form>

            {loading && (
                <div className="absolute flex justify-center items-center inset-0 bg-gray-300/50">
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default CreatePost;
