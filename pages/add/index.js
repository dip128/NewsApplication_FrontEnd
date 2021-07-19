import React from 'react'
import Card from '../../comps/Card'


export default function index() {
    return (
        <div className="container">
            <h1>Add News Sources </h1>
            <Card actions="Add"  name="Add Catagory" desc="Add Catagory to the database" href="/add/catagory"/>
            <Card actions="Add"  name="Add Agency" desc="Add Agency to the database" href="/add/agency"/>
            <Card actions="Add"  name="Add AgencyURL" desc="Add AgencyURL to the database" href="/add/agencyfeed"/>
            <Card actions="Delete"  name="Delete News" desc="Delete All News From The Database" href="/add/delete"/>
            
        </div>
    )
}
