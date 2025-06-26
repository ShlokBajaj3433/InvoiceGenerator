import React from 'react';
import './Template5.css'; // Make sure this file contains the CSS from 'invoice-layout-css'

// Inline SVG for icons (replace with lucide-react or similar if preferred and installed)
const Mail = ({ className = "w-3.5 h-3.5 mr-2 text-gray-500" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const Phone = ({ className = "w-3.5 h-3.5 mr-2 text-gray-500" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-1.18 2.19l-.7.64a15.1 15.1 0 0 0 6 6l.64-.7a2 2 0 0 1 2.19-1.18 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const MapPin = ({ className = "w-3.5 h-3.5 mr-2 text-gray-500" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const CalendarDays = ({ className = "w-4 h-4 mr-2 text-gray-500" }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>;


const Template5 = ({ data }) => {
    return (
        <div className="invoice-container border rounded mx-auto my-4 px-sm-4 py-3 w-100">
            <div className="invoice-content-area">

                {/* Header Section - Company & Invoice Title */}
                <div className="invoice-header-section">
                    <div> {/* This div holds the Invoice title and number */}
                        <h1 className='invoice-title'>Invoice</h1>
                        <p className="invoice-number-text">Invoice #<span className="font-semibold">{data.invoiceNumber}</span></p>
                    </div>
                    <div className="company-info-block">
                        {data.companyLogo && (
                            <div className="mb-2 company-logo">
                                <img src={data.companyLogo} alt="Company logo" width={98} />
                            </div>
                        )}
                        <h2 className="company-title">{data.companyName}</h2>
                        <p><MapPin /> {data.companyAddress}</p>
                        <p><Mail /> {data.companyEmail}</p> {/* Assuming companyEmail exists in data for the icon */}
                        <p><Phone /> {data.companyPhone}</p>
                    </div>
                </div>

                <hr className="orange-boarder" /> {/* Using the styled 'orange-boarder' class */}

                {/* Billing and Shipping Section */}
                <div className="billing-dates-section"> {/* This section uses grid for layout */}
                    <div> {/* Billing Information Block */}
                        <h3>Billing Information</h3>
                        <p className="name"><strong>Name:</strong> {data.billingName}</p>
                        <p><strong>Address:</strong> {data.billingAddress}</p>
                        <p><Phone /> {data.billingPhone}</p>
                        <p><Mail /> {data.billingEmail}</p> {/* Assuming billingEmail exists in data */}
                    </div>
                    <div className="invoice-dates-block"> {/* Shipping Information Block (now part of invoice-dates-block structure for styling) */}
                        <h3>Shipping Information</h3>
                        <p className="name"><strong>Name:</strong> {data.shippingName}</p>
                        <p><strong>Address:</strong> {data.shippingAddress}</p>
                        <p><Phone /> {data.shippingPhone}</p>
                        <p><Mail /> {data.shippingEmail}</p> {/* Assuming shippingEmail exists in data */}
                    </div>
                </div>

                {/* Items Section */}
                <div className="items-table-section">
                    <h3 >Items</h3> {/* H3 for items section */}
                    <table className="min-w-full bg-white">
                        <thead className="table-header-bg"> {/* Changed from table-light5 to table-header-bg */}
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th style={{ textAlign: 'right' }}>Rate</th> {/* Align for rate */}
                                <th style={{ textAlign: 'right' }}>Total</th> {/* Align for total */}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(data.items) && data.items.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}> {/* Tailwind classes for row stripes */}
                                    <td>{item.description}</td>
                                    <td style={{ textAlign: 'center' }}>{item.Qty}</td> {/* Align for quantity */}
                                    <td style={{ textAlign: 'right' }}>{data.currencySymbol}{item.Price.toFixed(2)}</td>
                                    <td style={{ textAlign: 'right' }}>{data.currencySymbol}{(item.Qty * item.Price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Total Section */}
                <div className="totals-section">
                    <div className="totals-card">
                        <div>
                            <span className="font-medium">Subtotal:</span>
                            <span className="font-semibold">{data.currencySymbol}{data.subtotal?.toFixed(2)}</span>
                        </div>
                        <div>
                            <span className="font-medium">Tax ({data.tax}%):</span>
                            <span className="font-semibold">{data.currencySymbol}{data.taxAmount?.toFixed(2)}</span>
                        </div>
                        <div className="total-due">
                            <span className="font-bold">TOTAL DUE:</span>
                            <span className="font-bold">{data.currencySymbol}{data.total?.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Bank Account Section */}
                {data.accountName && ( /* Conditionally render if bank account name exists */
                    <div className="bank-details-section">
                        <h3>Bank Account Details</h3>
                        <div className="bank-details-content">
                            <p><span className="font-medium">Account Name:</span> {data.accountName}</p>
                            <p><span className="font-medium">Account Number:</span> {data.accountNumber}</p>
                            <p><span className="font-medium">IFSC Code:</span> {data.accountIfsc}</p>
                        </div>
                    </div>
                )}

                {/* Notes Section */}
                {data.notes && data.notes.content && (
                    <div className="notes-section">
                        <h3>Notes</h3>
                        <p className="notes-content">{data.notes.content}</p>
                    </div>
                )}

                {/* Footer */}
                <div className="invoice-footer">
                    <p>&copy; {new Date().getFullYear()} {data.companyName}. All rights reserved.</p>
                    <p className="mt-1">Generated with InvoiceApp</p>
                </div>
            </div> {/* End invoice-content-area */}
        </div> // End invoice-container
    );
};

export default Template5;