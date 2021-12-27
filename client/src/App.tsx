import React, { useState } from 'react';
import axios from 'axios';
import ErrorText from './components/error-text/Error-text';
import Collection from './components/collection/Collection';
import FadeInOnScroll from './components/fade-in-on-scroll/Fade-in-on-scroll';

type CollectionData = {
    collectionName: string;
    image: string;
}

type Collections = CollectionData[];

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [collections, setCollections] = useState([] as Collections);
    const [error, setError] = useState('');

    const addCollection = (collectionObj: CollectionData) => {
        setCollections(prev => [...prev, collectionObj]);
    }

    const removeCollection = (name: string) => () => {
        console.log(collections);
        console.log(name);
        setCollections(prev => prev.filter((({ collectionName }) => collectionName !== name)))
    }

    const getCollectionData = async (collectionName: string) => {
        try {
            const { data: { name, image }  } = await axios.get(`https://api-mainnet.magiceden.io/collections/${collectionName.toLowerCase()}`);

            if (!name) return `Collection '${collectionName}' does not exist!`

            addCollection({ collectionName: (name as string).toLowerCase(), image });
        } catch (error: any) {
            return error.message;
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTerm(value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!searchTerm) return setError('Please enter a collection name');
        
        setError('');
        const err = await getCollectionData(searchTerm);
        if (err) setError(err);
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-1050 to-black'>
            <header className='fixed top-0 left-0 right-0 py-4 border-b border-gray-700 backdrop-filter backdrop-blur-md z-50'>
                <h1 className='text-gray-100 text-center uppercase text-3xl'>Sol Search.</h1>
            </header>
            <div className='mx-auto max-w-5xl flex justify-center pt-24'>
                <form onSubmit={handleSubmit} className='flex items-center space-x-4 w-3/4'>
                    <input type="text" placeholder='Enter Collection' name="collection" id="collection" className='block py-2 px-4 border border-gray-700 rounded flex-1 transition-all duration-300 focus:outline-none hover:border-gray-200 bg-transparent text-gray-100' value={searchTerm} onChange={handleChange} />
                    <button type='submit' className='bg-gray-600 rounded py-2 px-5 shadow text-gray-100 transition-all duration-300 hover:bg-gray-700'>Search collection</button>
                </form>
            </div>
            <div className='flex flex-col justify-center items-center pt-10'>
                { error && (
                    <div className='pb-10 text-center'>
                        <ErrorText>{error}</ErrorText>
                    </div>
                ) }
                {
                    collections.length !== 0 && collections.map((collection) => (
                        <FadeInOnScroll key={collection.collectionName} direction='center'>
                            <Collection collectionName={collection.collectionName.toLowerCase()} image={collection.image} searchName={searchTerm} removeCollection={removeCollection} />
                        </FadeInOnScroll>
                    ))
                }
            </div>
        </div>
    )
}

export default App;