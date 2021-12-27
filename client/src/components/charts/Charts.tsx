import React from 'react'
import Chart from '../chart/Chart';
import { ChartsProps } from './Charts.types';


function Charts({ floorPrice, totalVolume, totalListings }: ChartsProps) {
    return (
        <div className='space-y-4'>
            <div className='space-y-4'>
                <h2 className='text-2xl text-gray-100'>Floor price</h2>
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
