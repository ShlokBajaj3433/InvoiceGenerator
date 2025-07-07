import { Pencil } from 'lucide-react'
import { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../context/Appcontext.jsx';
import InvoiceForm from './../components/InvoiceForm';
import TempleteGrid from '../components/TempleteGrid.jsx';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [IsEditingtitle, setIsEditingtitle] = useState(false)
  const { Invoicetitle, setInvoicetitle,InvoiceData, setInvoiceData,  Settemplate } = useContext(AppContext)
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState(0);
  const navigate = useNavigate();


  const handleTemplateChange = (templateId) => {
    const hasEmptyFields = InvoiceData.items.some(
      (item) => !item.quantity || !item.price 
    );

    if (hasEmptyFields) {
      // Handle the case where there are empty fields
      alert('Fill all item fields before changing template.');
      // toast.error('Fill all item fields before changing template.');
      return;
    }
    Settemplate(templateId);
    navigate(`/Preview`);
    
  }


  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.offsetHeight);
    }
  });

  const handletitleChange = (e) => {
    setInvoicetitle(e.target.value)
    setInvoiceData((prevData) => ({
      ...prevData,
      title: e.target.value
    }))
  }
  const handleEditClick = () => {
    setIsEditingtitle(true)
  }
  const handletitleBlur = () => {
    setIsEditingtitle(false)
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-2">
      <div className="container">
        <div className="bg-white border rounded shadow-sm p-2 mb-4 mt-4">
          <div className="d-flex align-items-center">
            {IsEditingtitle ? (
              <input
                type="text"
                className="form-control form-control-sm border-0 p-0 bg-transparent fw-bold autofocus "
                style={{ fontSize: '1rem' }}
                onBlur={handletitleBlur}
                onChange={handletitleChange}
                value={Invoicetitle}
                autoFocus
              />
            ) : (
              <>
                <h3 className='mb-0 me-2 p-3'> {Invoicetitle} </h3>
                <button
                  className='btn btn-link text-dark p-0 '
                  onClick={handleEditClick}
                >
                  <Pencil className='text-secondairy'></Pencil>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Invoice form and template grid */}
        <div className="row g-3 align-items-stretch">
          {/* Invoice form */}
          <div className="col-12 col-lg-6 d-flex">
            <div className="bg-white border rounded shadow-sm p-3 flex-fill" ref={formRef}>
              <InvoiceForm />
            </div>
          </div>
          {/* Template preview or other content */}
          <div className="col-12 col-lg-6 d-flex">
            <div
              className="bg-white border rounded shadow-sm p-4 flex-fill"
              style={{ height: formHeight ? `${formHeight}px` : 'auto', overflow: 'auto' }}
            >
              <TempleteGrid onTemplateChange={handleTemplateChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage