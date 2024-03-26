import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../componments/Spinner';
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import BookCard from '../componments/home/BookCard';
import BookTable from '../componments/home/BookTable';

const Home = () => {
  const [book, setBook] = useState([]);
  const [loading, SetLoading] = useState(false);
  const[showType, SetShowType] = useState('table');
  useEffect(() => {
    SetLoading(true);
    axios.get('http://localhost:5555/book')
      .then((response) => {
        setBook(response.data.data);
        SetLoading(false);
      })
      .catch((error) => {
        console.log(error);
        SetLoading(false);
      });
  }, [])

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => SetShowType('table')}>
          Table
        </button>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => SetShowType('card')}>
          Card
        </button>

      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Book List</h1>
        <Link to='/book/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      { loading ? <Spinner/> : showType === 'table' ?  (<BookTable book={book}/>) : (<BookCard book={book}/>)}
    </div>
  )
}

export default Home
