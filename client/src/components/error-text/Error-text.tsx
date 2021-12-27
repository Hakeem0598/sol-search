import React from 'react'

function ErrorText({ children }: React.ComponentProps<'p'>) {
    return <p className='text-red-500'>{ children }</p>
}

export default ErrorText
