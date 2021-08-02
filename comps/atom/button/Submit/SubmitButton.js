import React from 'react'
import SubmitButtonStyle from '../Submit/SubmitButton.module.css'
import { motion } from 'framer-motion'

function SubmitButton(props) {
    return (
        <div>
            <motion.button className={SubmitButtonStyle.submitbutton} whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.5 },
                }}
                whileTap={{ scale: 0.9 }}>
      {props.title}
      </motion.button>
        </div>
    )
}

export default SubmitButton
