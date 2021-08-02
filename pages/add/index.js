import React from 'react'
import Card from '../../comps/molecule/Card/Card.js'
import { motion } from 'framer-motion';

const postVariants = {
    initial: { scale: 0, y: -1000, opacity: 0 },
    enter: { scale: 1, y: 1, opacity: 1, transition: { duration: 0.7, ease: [0.48, 0.15, 0.25, 0.96] } },
    exit: {
      scale: 0,
      x: -1000,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] }
    }
  };

export default function index() {
    return (
        <motion.div className="container" variants={postVariants} initial='initial' animate='enter' exit='exit'>
            <h1>Add News Sources </h1>
            <Card actions="Add"  name="Add Catagory" desc="Add Catagory to the database" href="/add/catagory"/>
            <Card actions="Add"  name="Add Agency" desc="Add Agency to the database" href="/add/agency"/>
            <Card actions="Add"  name="Add AgencyURL" desc="Add AgencyURL to the database" href="/add/agencyfeed"/>
            <Card actions="Delete"  name="Delete News" desc="Delete All News From The Database" href="/add/delete"/>
            
        </motion.div>
    )
}
