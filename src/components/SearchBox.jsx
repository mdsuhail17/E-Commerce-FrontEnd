import React from 'react'


export default function SearchBox({lable, placeholder, value, handaleSearch}) {


    


  return (
    <div>
   <div className='flex items-center gap-3 pl-4 flex-1 font-primary'>


       <label className='text-lg font-semibold text-primary dark:text-light'>{lable}</label>
       <input type="text" 
       className='px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-light focus:outline-none text-gray-800 dark:text-light'
       placeholder={placeholder}
       value={value}
       onChange={(event)=> handaleSearch(event.target.value)}
       />


   </div>
    </div>
  );
}
