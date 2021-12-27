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
            },
            layout: {
                backgroundColor: '#000',
                textColor: '#9ca3af'
            },
            grid: {
                vertLines: {
                    color: '#374151',
                },
                horzLines: {
                    color: '#374151',
                },
            }
        });

        setLineSeries(chart.addAreaSeries({
            topColor: 'rgba(47,184,207, 0.5',
			lineColor: 'rgba(47,184,207, 1)',
			bottomColor: 'rgba(47,184,207, 0.1)',
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

    return <div ref={ref} className='rounded-lg border overflow-hidden border-gray-700' />;
}

export default Chart;