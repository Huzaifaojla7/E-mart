import React from 'react'
import { motion } from 'framer-motion';
import './service.css'
import ServiceData from '../Assets/data/serviceData';
import serviceData from '../Assets/data/serviceData';
const Service = () => {
 
    return (
        <div>
            <div className="container">
                <div className="row mt-5">
               {
                serviceData.map((item,index)=>{
                    return(
                        <div className="col col-md-4 col-lg-3" key={index}>
                        <motion.div whileHover={{scale:1.1}} className="service_item" style={{background:`${item.bg}`}}>
                            <span><i class={item.icon}></i></span>
                            <div>
                                <h5>{item.title}</h5>
                                <p>{item.subtitle}</p>
                            </div>
                        </motion.div>
                    </div>
                    )
                })
               }
                </div>
            </div>
        </div>
    )
}

export default Service
