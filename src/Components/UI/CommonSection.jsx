import React from 'react'
import '../../Style/common-section.css'

const CommonSection = ({title}) => {
    return (
        <section className="common_section">
            <div className="container">
                <div className="row">
                    <h1>{title}</h1>
                </div>
            </div>
        </section>
    )
}

export default CommonSection
