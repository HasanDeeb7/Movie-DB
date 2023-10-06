import React from 'react'
import { Oval } from 'react-loader-spinner'
function Loading() {
  return (
    <span className="loading-container">
              <Oval
                ariaLabel="loading-indicator"
                height={100}
                width={100}
                strokeWidth={2000}
                strokeWidthSecondary={2030}
                color="var(--highlight-clr)"
                secondaryColor="var(--secondary-clr)"
              />
            </span>
  )
}

export default Loading