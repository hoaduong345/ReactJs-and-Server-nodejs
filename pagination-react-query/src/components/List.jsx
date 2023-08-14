
import { BsTrash } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi'

const List = () => {
  return (
    <li>
        <div className="flex flex-">
        <BsTrash className='text-black m-3 cursor-pointer'/>
        <BiEditAlt className='text-black m-3 cursor-pointer' />
        </div>
    </li>
   
  ) 
 
  
}

export default List