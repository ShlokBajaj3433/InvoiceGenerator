import React, { forwardRef } from 'react'
import Template1 from './../templates/Template1';
import { formatInvoiceData } from '../util/formatInvoiceData';

const InvoicePreview = forwardRef(({InvoiceData,template}, ref) => {
    const formatedData = formatInvoiceData(InvoiceData) ;

    return (
        <div className="invoice-preview container px-2 py-2 overflow-x-auto" ref={ref} >
        <Template1 data={formatedData}  />
    </div>
  )
})

export default InvoicePreview