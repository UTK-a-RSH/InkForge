import React from 'react'
import {useSelector} from 'react-redux'

function ThemeProvider({children}) {
const {theme} = useSelector( state => state.theme)

  return (
    <div className={theme}>

        <div className='bg-white text-gray-700 dark:text-gary-200 dark:bg-[rgb(2,2,7)] min-h-screen'>
            {children}
        </div>
    </div>
  )
}

export default ThemeProvider