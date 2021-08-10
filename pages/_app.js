import Footer from '../comps/organism/Footer'
import Navbar from '../comps/organism/Navbar'
import '../styles/globals.css'
import ReactNotifications from 'react-notifications-component';
import { AnimatePresence } from 'framer-motion'


function MyApp({ Component, pageProps,router}) {



  return (
    <div>
      <Navbar />
      <ReactNotifications/>
      <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route}/>
      </AnimatePresence>
       <Footer/> 
    </div>
  )
}

export default MyApp
