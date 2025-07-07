import React, { forwardRef } from 'react'
import { formatInvoiceData } from '../util/formatInvoiceData';
import { TemplatesComponents } from '../util/InvoiceTemplates';

const InvoicePreview = forwardRef(({InvoiceData,template}, ref) => {
    const formatedData = formatInvoiceData(InvoiceData) ;
    const SelectTemplate = TemplatesComponents[template] || TemplatesComponents["template1"]

    return (
        <div className="invoice-preview container px-2 py-2 overflow-x-auto" ref={ref} >
        <SelectTemplate data={InvoiceData}  />
    </div>
  )
})

export default InvoicePreview