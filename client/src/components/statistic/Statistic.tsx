import React from 'react'
import { StatisticProps } from './Statistic.types'

function Statistic({ title, value }: StatisticProps) {
    return (
        <div className='rounded-md p-3 flex-1 bg-gray-800  bg-opacity-50'>
            <p className='text-gray-500 uppercase text-xs tracking-wide'>{ title }</p>
            <p className='text-gray-100'>{ title  === 'Total Listings' ?  value : `${value} SOL` }</p>
        </div>
    )
}

export default Statistic
