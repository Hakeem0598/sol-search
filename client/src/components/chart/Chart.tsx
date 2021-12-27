import React, { useEffect, useState } from 'react';
import { createChart, ISeriesApi, UTCTimestamp } from 'lightweight-charts';
import { ChartProps } from './Chart.types';

function Chart({ value, width }: ChartProps) {
    const [lineSeries, setLineSeries] = useState({} as ISeriesApi<"Area">)
    const ref = React.useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const chart = createChart(ref.current, { 
            width, 
            height: 300,
            timeScale: {
                timeVisible: true,
            }
        });

        setLineSeries(chart.addAreaSeries({
            lineColor: '#60BEEB',
            topColor: 'lightblue',
            bottomColor: 'white',
            crosshairMarkerBorderColor: 'white',
            lastPriceAnimation: 1,
            priceLineVisible: true
        }));
    }, [width]);

    useEffect(() => {
        if (lineSeries.update) {
            lineSeries.update({ time: Date.now() / 1000 as UTCTimestamp, value });
        }
    }, [value, lineSeries]);

    return <div ref={ref} />;
}

export default Chart;