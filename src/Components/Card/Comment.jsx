import React, { useContext } from 'react';
import PostHeader from './PostHeader';
import { useCardContext } from '@heroui/react';
import { AuthContext } from '../../assets/Context/AuthContext';
import DropDowenAction from '../DropDownAction';

const Comment = ({comment ,postid,callback}) => {
const{userData}=useContext(AuthContext)
    return (
        <>
          <div className=''>    
      <div className='w-full h-18 flex justify-between items-center'>
        <PostHeader
    photo={comment.commentCreator.photo}
    name={comment.commentCreator.name}
    date={comment.createdAt}
  />
 { userData._id === comment.commentCreator._id && userData._id===postid && 
<DropDowenAction commentId={comment._id} callback={callback}/>
}
        </div>
        <p className='pb-5'>{comment.content}</p>
        <hr  className='border-gray-300'/>
        </div>
       
        </>
    );
}

export default Comment;
