import React from 'react';

export default function Button({text, onClick}) {
   return (
      <button className='bg-black px-4 py-1 text-white' onClick={onClick}>
         {text}
      </button>
   );
}

