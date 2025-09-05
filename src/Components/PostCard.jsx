import React, { useContext, useState } from 'react';
import image from '../assets/OIP.webp'
import PostHeader from './Card/PostHeader';
import PostBody from './Card/PostBody';
import PostFooter from './Card/PostFooter';
import Comment from './Card/Comment';
import { Button, Input } from '@heroui/react';
import { creatCommentApi, getPostCommentApi } from '../Services/commentService.js';
import { AuthContext } from '../assets/Context/AuthContext.jsx';
import DropDownAction from './DropDownAction.jsx';
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@heroui/dropdown";
import CreatePost from './Creatpost.jsx';

const PostCard = ({ post, commentLimit, callback }) => {
  if (!post) return null;
  const [commentContent, setCommentContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [comments, setcomments] = useState(post.comments);
   const [isUpdating, setIsUpdating] = useState(false);
  const { userData } = useContext(AuthContext)
  


  async function creatComment(e) {
    e.preventDefault();
    setLoading(true)
    const response = await creatCommentApi(commentContent, post.id);
    if (response.message) {
      setcomments(response.comments)
      setCommentContent('');
      //  await callback();
    }
    setLoading(false)
  }
  async function getPostComments() {
    const response=await getPostCommentApi(post._id);
    setcomments(response.comments)
  }

  return (
    <>{
      isUpdating ?  <CreatePost post={post} callback={callback} isUpdating={isUpdating} setIsUpdating={setIsUpdating}/> :
      <div className="bg-white w-full rounded-md shadow-md h-auto overflow-hidden py-3 px-3 my-5">
        <div className="w-full h-16 items-center flex justify-between ">
          {post?.user && (
            <PostHeader
              photo={post.user?.photo}
              name={post.user?.name}
              date={post?.date}
            />
          )}
          { userData._id === post.user._id && 
          <>
        <Dropdown>
      <DropdownTrigger>
       <svg
            className="w-16 outline-0 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={12} r={1} />
            <circle cx={19} cy={12} r={1} />
            <circle cx={5} cy={12} r={1} />
          </svg>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem  onClick={()=>setIsUpdating(true)} key="copy">Edit</DropdownItem>
        <DropdownItem  key="delete" className="text-danger" color="danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
          
          </>}
            
        </div>
        <PostBody body={post?.body || ""} image={post?.image } />
        <PostFooter length={comments?.length || 0} id={post?._id} />
        <form className='flex gap-2 mb-2' onSubmit={creatComment}>
          <Input variant='bordered' placeholder='Comment...' value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
          <Button isLoading={loading} type='submit' disabled={commentContent.length < 2} color='primary'>Add Comment</Button>

        </form>



        <div className="p-4 bg-gray-100 -mx-3 -mb-3">
          {comments?.length > 0 &&
            comments.slice(0, commentLimit).map((comment ,key={commentid}) =>
              <Comment callback={getPostComments} postid={post.user._id} comment={comment} key={comment._id} />)}
        </div>
      </div>
    }
   
      

    </>
  );
}

export default PostCard;