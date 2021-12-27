import React from 'react'
import Chart from '../chart/Chart';
import { ChartsProps } from './Charts.types';


function Charts({ floorPrice, totalVolume, totalListings, removeCollection }: ChartsProps) {
    return (
        <div className='space-y-4'>
            <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-2xl text-gray-100'>Floor price</h2>
                    <button className='bg-opacity-10 bg-gray-600 rounded py-2.5 px-5 text-blue-500 hover:text-blue-700 transition-all duration-300' onClick={removeCollection}>Remove collection</button>
                </div>
                <Chart value={floorPrice} width={window.screen.width - 80} />
            </div>
            <div className='flex items-center justify-between'>
                <div className='space-y-4'>
                    <h2 className='text-2xl text-gray-100'>Total volume</h2>
                    <Chart value={totalVolume} width={(window.screen.width / 2) - 80} />
                </div>
                <div className='space-y-4'>
                    <h2 className='text-2xl text-gray-100'>Total listings</h2>
                    <Chart value={totalListings} width={(window.screen.width / 2) - 80} />
                </div>
            </div>
        </div>
    )
}

export default Charts
