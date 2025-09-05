import React from 'react';
import defaultImage from '../../assets/OIP.webp';

const PostHeader = ({ photo, name, date }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      return dateString.split('.', 1)[0].replace('T',' ');
    } 
    catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };
 
  return (
    <div className="flex items-center">
      <img 
        onError={(e) => {
          e.target.src = defaultImage;
          e.target.onerror = null; 
        }}
        className="rounded-full w-10 h-10 mr-3 object-cover"
        src={photo || defaultImage}
        alt={name || 'User'}
      />
      <div>    
        <h3 className="text-md font-semibold">{name || 'Unknown User'}</h3>
        <p className="text-xs text-gray-500 ">{formatDate(date)}</p>

    </div>
    </div>
  );
}

export default PostHeader;