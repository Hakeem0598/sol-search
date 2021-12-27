export type Directions = 'left' | 'right' | 'up' | 'down' | 'center';

export type FadeInOnScrollProps =  React.ComponentProps<'div'> & {
    direction: Directions;
    duration?: number;
}

export type DirectionsToPosition = {
    [ key in Directions ]: { x?: number, y?: number }
}