import React, { ReactNode } from 'react'
import Header from '../header'





const Wrapper = ({ children }) => {
  return (
    <>
        <Header />
            <main>{children}</main>
        {/* <Footer /> */}
    </>
  )
}

export default Wrapper