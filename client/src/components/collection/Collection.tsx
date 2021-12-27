import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Charts from '../charts/Charts';
import ErrorText from '../error-text/Error-text';
import Statistic from '../statistic/Statistic';
import { CollectionProps, CollectionStats, Status } from './Collection.types';

function Collection({ collectionName, searchName, image, removeCollection }: CollectionProps) {
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState('');
    const [floorPrice, setFloorPrice] = useState<number | null>(null);
    const [totalVolume, setTotalVolume] = useState<number | null>(null);
    const [totalListings, setTotalListings] = useState<number | null>(null);

    const getFloorPrice = async (collectionName: string) => {
        try {
            const { data: { results } } = await axios.get(`https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={"$match":{"collectionSymbol":"${collectionName}"},"$sort":{"takerAmount":1,"createdAt":-1},"$skip":0,"$limit":10}`);

            const { price } = results[0];
            if (price !== 0) setFloorPrice(price);
            setError(''); 
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    const getEscrowStats = async (collectionName: string) => {
        try {
            const { data: { results } } = await axios.get(`https://api-mainnet.magiceden.io/rpc/getCollectionEscrowStats/${collectionName}`);

            const { volumeAll, listedCount } = results;

            const volume = +(volumeAll / 1e9).toFixed(2);

            setTotalVolume(volume)
            setTotalListings(listedCount);
            setError(''); 
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await getFloorPrice(searchName);
                await getEscrowStats(searchName);
            } catch (error: any) {
                setError(error.message);
            }
        }, 1000);

        setStatus('initialized');

        return () => {
            clearInterval(interval)
        }
    }, []);

    return (
        <div className='flex flex-col justify-center items-center pt-10'>
            { error && (
                <div className='pb-10 text-center'>
                    <ErrorText>{error}</ErrorText>
                </div>
            ) }
            {
                status === 'initialized' && (
                    <div className='w-full'>
                        <div className='text-center space-y-6 w-full'>
                            <img src={ image } alt="Avatar" className='h-40 w-40 rounded-full inline-flex items-center justify-center border-2' />
                            <h1 className='capitalize text-4xl text-gray-100'>{ collectionName }</h1>
                            <div className='flex flex-wrap items-center space-x-4 w-full max-w-2xl mx-auto'>
                                {
                                    ([{ title: 'Floor', value: floorPrice }, { title: 'Total Volume', value: totalVolume }, { title: 'Total Listings', value: totalListings }] as CollectionStats).map((stat) => (
                                        <Statistic key={stat.title} {...stat} />
                                    ))   
                                }
                            </div>
                        </div>
                        <div className='w-full flex items-center justify-center py-10'>
                            <Charts floorPrice={floorPrice} totalVolume={totalVolume} totalListings={totalListings} removeCollection={removeCollection(collectionName)} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Collection
