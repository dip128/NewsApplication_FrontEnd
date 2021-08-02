import React from 'react'
import DeleteButtonStyle from '../DeleteButton/DeleteButton.module.css'
import { motion } from 'framer-motion'
function DeleteButton() {
    return (
        <div>
            <motion.button className={DeleteButtonStyle.deletebutton}whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.5 },
                }}
                whileTap={{ scale: 0.9 }}>Delete</motion.button>
        </div>
    )
}

export default DeleteButton
