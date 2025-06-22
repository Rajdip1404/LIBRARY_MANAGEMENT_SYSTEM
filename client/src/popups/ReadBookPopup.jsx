import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleReadBookPopup } from '../store/slices/popUp.slice';

const ReadBookPopup = ({book}) => {
  const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 bg-black/30 p-5 flex items-center justify-center z-50">
      <div className="w-11/12 bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-1/3">
        <div className='flex justify-between items-center bg-black text-white px-6 py-4 rounded-t-lg'>
          <h2 className='text-white text-lg font-bold'>View Book Info</h2>
          <button onClick={()=>dispatch(toggleReadBookPopup())} className='text-white text-lg font-bold'>&times;</button>
        </div>

        <div className='p-6'>
          <div className='mb-4'>
            <label className='block text-gray-700 font-semibold mb-2'>Title</label>
            <p className='border border-gray-300 rounded-lg px-4 py-2 bg-gray-100'>{book && book.title}</p>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-semibold mb-2'>Author</label>
            <p className='border border-gray-300 rounded-lg px-4 py-2 bg-gray-100'>{book && book.author}</p>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-semibold mb-2'>Description</label>
            <p className='border border-gray-300 rounded-lg px-4 py-2 bg-gray-100'>{book && book.description}</p>
          </div>

        </div>

        <div className='flex justify-end p-4 border-t border-gray-200 '>
          <button 
            onClick={() => dispatch(toggleReadBookPopup())} 
            className='w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-300 hover:text-black hover:cursor-pointer transition duration-200'
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default ReadBookPopup
