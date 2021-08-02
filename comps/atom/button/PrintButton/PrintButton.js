import React from 'react'
import PrintButtonStyle from '../PrintButton/PrintButton.module.css'


function PrintButton() {
    return (
        <div>
            <button className={PrintButtonStyle.printbutton} style={{float:'right' ,margin:'10px'}}>Print The Report</button>
        </div>
    )
}

export default PrintButton
