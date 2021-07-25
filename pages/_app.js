import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'
import '../styles/globals.css'
import ReactNotifications from 'react-notifications-component';



function MyApp({ Component, pageProps }) {



  return (
    <div>
      <Navbar />
      <ReactNotifications/>
      <Component {...pageProps} />
      
       <Footer/> 
    </div>
  )
}

export default MyApp
