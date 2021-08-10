import Link from 'next/link'
import Image from 'next/image'
import NavbarStyle from '../../styles/Navbar.module.css'
import { motion } from 'framer-motion'
import { transitions } from 'react-alert'

const logoAnimate = {
  initial:{
    y:-250
  },
  enter:{
    y:[-2,4,-2,4,-2,4]
    
  }
}

export default function Navbar() {
  return (
    <motion.div className="container" initial={{y:-250}} animate={{y:-2}}>
      <nav className={NavbarStyle.navbar}>
        <motion.div drag><Image src="/rupee.png" width={50} height={48} /></motion.div>
        <motion.h1 className={NavbarStyle.h} animate={{fontWeight:50}}>GETNEWS</motion.h1>
        <ul className={NavbarStyle.u}>
           <motion.li className={NavbarStyle.l} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}><Link href="/" animate={{}}><a>Home</a></Link></motion.li>
          <motion.li className={NavbarStyle.l} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}><Link href="/news"><a>News</a></Link></motion.li>
          <motion.li className={NavbarStyle.l} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}><Link href="/report"><a>Report</a></Link></motion.li>
          <motion.li className={NavbarStyle.l} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8}}><Link href="/add"><a>Admin</a></Link></motion.li>
        </ul>
      </nav>
    </motion.div>
  )
}