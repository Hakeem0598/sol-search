import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { DirectionsToPosition, FadeInOnScrollProps } from './Fade-in-on-scroll.types';

const directions: DirectionsToPosition = {
    left: { x: -100 },
    right: { x: 100 },
    center: { x: 0 },
    up: { y: -100 },
    down: { y: 100 },
}

function FadeInOnScroll({ children, direction, duration = 0.5, className }: FadeInOnScrollProps) {
    const { ref, inView } = useInView();
    const animation = useAnimation();
    
    useEffect(() => {
        if (inView) {
            animation.start({ opacity: 1, x: 0, y: 0, transition: { duration }})
        }
    }, [inView, animation, duration]);

    return (
        <motion.div
            ref={ref}
            animate={animation}
            className={className}
            initial={{ opacity: 0, ...directions[direction] }}
        >
            { children }
        </motion.div>
    )
}

export default FadeInOnScroll;
