import { useEffect, useState, useContext } from 'react'

import { AppContext, InitialInvoiceData } from './../context/Appcontext';

import { getAllInvoice } from '../service/InvoiceService';

import { toast } from 'react-hot-toast';

import { Plus } from 'lucide-react';

import { formatDate } from './../util/formatInvoiceData';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '@clerk/clerk-react';





function Dashboard() {

     const [Invoices, setInvoices] = useState([])
 const {baseURL,Settemplate,setInvoiceData,setInvoicetitle} = useContext(AppContext)
const navigate = useNavigate()


    useEffect(() => {
      const Fetchinvoices = async () => {
        try {
          const token = await getToken()
          const response = await getAllInvoice(baseURL,token);
          console.log("Fetched invoices:", response.data);
          let invoicesArray = [];
          if (Array.isArray(response.data)) {
            invoicesArray = response.data;
          } else if (Array.isArray(response.data.invoices)) {
            invoicesArray = response.data.invoices;
          }
          setInvoices(Array.isArray(invoicesArray) ? invoicesArray : []);
        } catch (error) {
          toast.error("Fail to load the invoices ", error);
          setInvoices([]);
        }
      };
      Fetchinvoices();
    }, [baseURL]);

      const handleViewClick = (invoice) => {
      setInvoiceData(invoice);
      setInvoicetitle(invoice.title || "New Invoice");
      Settemplate(invoice.template || "template1");
      navigate("/Preview", { state: { invoice } }); 
    }


    const handleCreateNewInvoice = () => {
      setInvoiceData(InitialInvoiceData);
      setInvoicetitle("Invoice");
      Settemplate("template5");
      navigate("/generate");

    }

     return (

                         <div className="container py-5">

                                   <div className="row row-cols-1 rowcols-sm-2 row-cols-md-3 row-cols-lg-5 gap-4">

                                        {/* Creat a new Invoice Card */}

                                        <div className='col'>

                                             <div onClick={()=>{handleCreateNewInvoice()}} className='card h-100 d-flex justify-content-around align-items-center border-light shadow-sm cursor-pointer' style={{minHeight: '270px'}}>

                                                  <Plus size={48}/>

                                                  <p className='mt-3 fw-medium'>Create New Invoice</p>

                                             </div>

                                        </div>

                                        {/* render the invoice */}

                                        {Invoices.map((invoice, idx) => (
                                          <div className='col' key={idx}>
                                            <div className='card h-100 shadow-sm cursor-pointer' style={{minHeight:'270px'}} onClick={() => handleViewClick(invoice) }>
                                              {(invoice.thumbnailUrl ) && (
                                                <img
                                                  src={invoice.thumbnailUrl || invoice.thumbnailURL || invoice.thumbnailurl}
                                                  alt='Invoice thumbnail'
                                                  className='card-img-top'
                                                />
                                              )}
                                              <div className='card-body'>
                                                <h6 className="card-title md-1">{invoice.title}</h6>
                                                <small className='text-muted'>
                                                  Created At: {formatDate(invoice.createdAt)}
                                                </small>
                                              </div>
                                            </div>
                                          </div>
                                        ))}

                                   </div>

                         </div>

                         );

                    } 

                    export default Dashboard;



