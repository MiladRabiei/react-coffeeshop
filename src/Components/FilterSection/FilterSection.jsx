import React from 'react'

export default function FilterSection({ title, options,contents, filterType, filters, onChange }) {
  return (
    <>
    {options.map((option) => (
      <div key={option}>
        <label  className='flex items-center gap-x-2'>
        <input
          type="checkbox"
          className='peer hidden'
          checked={filters.includes(option)}
          onChange={() => onChange(filterType, option)}
        />
        <span className='w-4 h-4 bg-white peer-checked:bg-orange-300 peer-checked:border-orange-200 '>
        </span>
        <span>{option}</span>
        </label>
      </div>
    ))}
    </>
  
  )
}
