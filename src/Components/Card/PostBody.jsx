import React from 'react';

const PostBody = ({body,image}) => {
    return (
        <>
            
          {body &&<p className='mb-3'>{body}</p>}
         {image && <img className='w-full h-75 object-cover' src={image} />}  
        </>
    );
}

export default PostBody;
