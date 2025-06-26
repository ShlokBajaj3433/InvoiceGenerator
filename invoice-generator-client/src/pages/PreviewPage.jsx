import React, { useContext } from 'react'
import { templates } from '../assets/assets';
import { AppContext } from '../context/Appcontext.jsx';
import InvoicePreview from '../components/InvoicePreview.jsx';


function PreviewPage() {
  const previewRef = React.useRef(null);
  const {selectedTemplate, InvoiceData, SetSelectedTemplate}  = useContext(AppContext);
  return (
    <div className='container-fluid min-vh-100 p-3'>
      {/* Action buttons */}
      <div className='previewpage d-flex flex-column align-items-center mb-4 gap-3'>

          <div className='d-flex gap-2 flex-wrap justify-content-center'>
            {templates.map(({ id, label, img }) => (
            <button
              key={id}
              className={`btn ${selectedTemplate === id ? 'btn-warning' :'bg-warning-subtle' }`}
              onClick={() => SetSelectedTemplate(id)}
            >
              {label}
            </button>
            ))}
          </div>

          {/* List of action buttons */}
        <div className="d-flex gap-2 flex-wrap justify-content-center">
          <button className="btn btn-primary align-items-center justify-content-center">Save and Exit</button>
          <button className="btn btn-danger">Delete Invoice</button>
          <button className="btn btn-secondary">Back to Dashboard</button>
          <button className="btn btn-info">Send Email</button>
          <button className="btn btn-success d-flex align-items-center justify-content-center">Download PDF</button>
        </div>
      </div>

      {/* Display Preview Section */}
      
      <div className='flex-grow-1 overflow-auto d-flex justify-content-center align-items-center bg-light p-3' >

            <div ref={previewRef} className='invoice-preview' >
              <InvoicePreview InvoiceData={InvoiceData} template={selectedTemplate} />
            </div>

      </div>

    </div>
  )
}

export default PreviewPage