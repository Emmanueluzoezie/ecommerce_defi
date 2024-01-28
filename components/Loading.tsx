import React from 'react'
import { Blocks } from 'react-loader-spinner'

const LoadingComponent = () => {
  return (
    <div className='flex items-center justify-center h-[90vh]'>
          <Blocks
              height="80"
              width="80"
              color="#6206e3"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
          />
    </div>
  )
}

export default LoadingComponent