import React, { useEffect, useState } from 'react'
import "../../Style/clock.css"
function Clock() {

    const [day, setday] = useState(0)
    const [hour, sethour] = useState(0)
    const [min, setmin] = useState(0)
    const [sec, setsec] = useState(0)

    let interval;
    const countDown = () => {
        const destination = new Date('October 30,2023').getTime();
        interval = setInterval(() => {
            const now = new Date().getTime();
            const differene = destination - now;
            const days = Math.floor(differene / (1000 * 60 * 60 * 24))
            const hour = Math.floor(differene % (1000 * 60 * 60 * 24) / ((1000 * 60 * 60)))
            const min = Math.floor(differene % (1000 * 60 * 60) / (1000 * 60))
            const sec = Math.floor(differene % (1000 * 60) / 1000)
            if (destination < 0) clearInterval(interval)
            else{
                setday(days)
                sethour(hour)
                setmin(min)
                setsec(sec)
            }
        },800)
    }

    useEffect(()=>{
        countDown()
    },[])
    return (
        <div className="container">
            <div className="row mb-3 p-0 counterTime">

                <div className="col-2 text-center">
                    <h4 className='text-white mb-2'>{day}</h4>
                    <h6 className='text-white'>Days</h6>
                </div>
                <div className="col-1 text-white fw-bold">
                    :
                </div>
                <div className="col-2 text-center">
                    <h4 className='text-white mb-2'>{hour}</h4>
                    <h6 className='text-white'>Hours</h6>
                </div>
                <div className="col-1 text-white fw-bold">
                    :
                </div>
                <div className="col-3 text-center">
                    <h4 className='text-white mb-2'>{min}</h4>
                    <h6 className='text-white'>Min</h6>
                </div>
                <div className="col-1 text-white fw-bold">
                    :
                </div>
                <div className="col-2 text-center">
                    <h4 className='text-white mb-2'>{sec}</h4>
                    <h6 className='text-white'>Sec</h6>
                </div>

            </div>
        </div>
    )
}

export default Clock
