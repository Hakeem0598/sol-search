import { StatisticProps } from './../statistic/Statistic.types';

export type CollectionStats = StatisticProps[]

export type CollectionProps = {
    image: string;
    collectionName: string;
    searchName: string;
    removeCollection(name: string): () => void;
}

export type Status =  'idle' | 'initialized';