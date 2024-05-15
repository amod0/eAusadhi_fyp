import React from 'react';

const ImageColumn = ({ imageList, onImageClick,user }) => (
      console.log(imageList,'i'),
  <td key={'imageKey'}>
    <span style={{ display: 'flex', cursor: 'pointer' }}>
      {imageList.map((image, index, array) => {
        if (index === 0) {
          return (
            <div
              key={`${index}`}
              onClick={(e) => {
                e.stopPropagation();
                onImageClick(index, array);
              }}
            >
             <img onClick={() => onImageClick()} src={image} className='thumbnail-img' />
            </div>
          );
        }
        // if (index === 1) {
        //   return (
        //     <span className='relative' key={`${image._id}-${index}`}>
        //       <span
        //         className='thumbnail-overlay'
        //         onClick={(e) => {
        //           e.stopPropagation();
        //           onImageClick(index, array);
        //         }}
        //       >
        //         +{array.length - 1}
        //       </span>
        //       { image.user === user._id &&  <img onClick={() => onImageClick()} src={image.prescriptionimage} className='thumbnail-img' />}

        //     </span>
        //   );
        // }
      })}
    </span>
  </td>
);

export { ImageColumn };