import React, { useContext } from 'react'
import { Context } from '@/utils/Context'

export default function index() {

  const { selectedPlace, setSelectedPlace } = useContext(Context)
  return (
    <div>
      <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your location</label>
      <div className="relative mb-6">

        <input readOnly={true} type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={selectedPlace}

        />
      </div>
    </div>
  )
}
