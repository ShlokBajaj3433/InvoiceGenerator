import React, { useContext, useEffect } from 'react'
import { templates } from '../assets/assets';
import { AppContext } from '../context/Appcontext.jsx';
import InvoicePreview from '../components/InvoicePreview.jsx';
import { deleteInvoice, saveInvoice, sendInvoice } from '../service/InvoiceService.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import { uploadInvoiceThumbnail } from '../service/ColudnaryService.js';
import { useLocation } from 'react-router-dom';
import { generatePDFfromElement } from '../util/pdfUtil.js';
import { useUser } from '@clerk/clerk-react';

function PreviewPage() {
  const previewRef = React.useRef();
  const {template, InvoiceData, Settemplate, baseURL,setInvoiceData}  = useContext(AppContext);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation(); 
  const [Downloading, setDownloading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [Emaling, setEmaling] = useState(false)
  const {getToken} = userAuth();
  const {user} = useUser()

  const handleSaveAndExit = async () => {
    // Declaring variables in the top-level scope of the function
    let imageData = null;
    let canvas = null;
   

    try {
        if (!previewRef.current) {
            console.error("Error: previewRef is not available.");
            toast.error("Preview not ready. Please try again.");
            return;
        }
        setLoading(true);

        try {
            canvas = await html2canvas(previewRef.current, {
                scale: 2,
                useCORS: true, // IMPORTANT: See note below
                backgroundColor: '#fff',
                scrollY: -window.scrollY,
                logging: true // Enable html2canvas's own logging
            });
        } catch (html2canvasError) {
            // This will catch errors specifically from the html2canvas library
            console.error("CRITICAL FAILURE inside html2canvas:", html2canvasError);
            toast.error("Failed to capture invoice preview image.");
            setLoading(false); // Make sure to turn off loading here
            return;
        }

        if (!canvas) {
            console.error("Error: html2canvas ran but did not return a valid canvas object.");
            toast.error("Failed to generate preview canvas.");
            return;
        }

        imageData = canvas.toDataURL("image/png");

        const thumbnailUrl = await uploadInvoiceThumbnail(imageData);
        const payload = { ...InvoiceData, template,clerkId: user.id, tax: Number(InvoiceData.tax), thumbnailUrl: typeof thumbnailUrl === "object" ? thumbnailUrl.secure_url || thumbnailUrl.url : thumbnailUrl };
        const token = await getToken()
        
        const response = await saveInvoice(baseURL, payload, token);

        

        if (response?.status === 200 || response?.status === 201) {
            toast.success("Successfully saved invoice.");
            navigate("/dashboard");
        } else {
            toast.error("Failed to save invoice. Try again.");
        }

    } catch (error) {
        // This is the general catch block for any other errors
        console.error("A GENERAL ERROR OCCURRED in handleSaveAndExit:", error);
        toast.error(error.message || "An unexpected error occurred.");
    } finally {
        console.log("9. 'finally' block reached. Setting loading to false.");
        setLoading(false);
    }
};

  const handleDelete =async ()=>{

    try {
      const token = await getToken()
      const response = await deleteInvoice(baseURL, InvoiceData.id,token)
      if (response.status === 204) {
        
      toast.success("Invoice deleted successfully.");
      navigate("/dashboard");
    }else{
      toast.error("Failed to delete invoice. Try again.");
    }
  } 
     catch (error) {
      toast.error("An error occurred while deleting the invoice.");
    }

  }

  const handleDownloadPDF = async () => {
    if (!previewRef.current) {
      return
    }

    try {
      setDownloading(true);
      await generatePDFfromElement(previewRef.current, `invoice-${Date.now()}.pdf`, false)
    } catch (error) {
      toast.error("Failed to download PDF. Please try again.");
    }finally{
      setDownloading(false);
    }
  }

const handelSendEmail = async () => {
  try {
    setEmaling(true);
    const pdfBlob = await generatePDFfromElement(previewRef.current, `invoice-${Date.now()}.pdf`, true);
    const pdfFile = new File([pdfBlob], `invoice-${Date.now()}.pdf`, { type: "application/pdf" }); // <-- fix here
    const formdata = new FormData();
    formdata.append("file", pdfFile); // <-- use pdfFile
    formdata.append("email", customerEmail);
    const token = await getToken()
    const response = await sendInvoice(baseURL, formdata, token);
    if (response.status === 200) {
      toast.success("Invoice sent successfully.");
      setShowModal(false);
    } else {
      toast.error("Failed to send invoice. Try again.");
    }
  } catch (error) {
    toast.error("An error occurred while sending the invoice.");
  } finally {
    setEmaling(false);
  }
}


useEffect(() => {
  if(!InvoiceData){
    toast.error(   "Invoice data not found. Please go back to the generate page and fill the form.")
    navigate("/dashboard")
  }

}, [InvoiceData,navigate])

     
  return (
    <div className='container-fluid min-vh-100 p-3'>
      {/* Action buttons */}
      <div className='previewpage d-flex flex-column align-items-center mb-4 gap-3'>

          <div className='d-flex gap-2 flex-wrap justify-content-center'>
            {templates.map(({ id, label, img }) => (
            <button
              key={id}
              className={`btn ${template === id ? 'btn-warning' :'bg-warning-subtle' }`}
              onClick={() => Settemplate(id)}
            >
              {label}
            </button>
            ))}
          </div>

          {/* List of action buttons */}
        <div className="d-flex gap-2 flex-wrap justify-content-center">
          <button className="btn btn-primary align-items-center justify-content-center" onClick={handleSaveAndExit} disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            )}
            {loading ? "Saving...":"Save and Exit"}</button>
          {InvoiceData.id &&<button className="btn btn-danger"
          onClick={handleDelete}
          >Delete Invoice</button>}
          <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
          <button className="btn btn-info" onClick={()=> {setShowModal(true)}}>Send Email</button>
          <button className="btn btn-success d-flex align-items-center justify-content-center"
          onClick={handleDownloadPDF}
          >
            {Downloading && (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            )}
            {Downloading ? "Downloading... ": "Download PDF"}</button>
        </div>
      </div>

      {/* Display Preview Section */}
      
      <div className='flex-grow-1 overflow-auto d-flex justify-content-center align-items-center bg-light p-3' >

            <div ref={previewRef} className='invoice-preview' >
              <InvoicePreview InvoiceData={InvoiceData} template={template} />
            </div>

      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Invoice via Email</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="recipientEmail" className="form-label">Recipient Email</label>
                    <input type="email" className="form-control" id="recipientEmail" placeholder="name@example.com" onChange={(e) => setCustomerEmail(e.target.value)} value={customerEmail} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={() => handelSendEmail()} disabled={Emaling}>{Emaling ? "Sending..." : "Send"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

}
export default PreviewPage