import React from 'react';
import './Template6.css';

const Template6 = ({ data }) => {
    const currencySymbol = "₹"; 

    // Calculate totals safely
    const subtotal = Array.isArray(data.items)
        ? data.items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0)
        : 0;

    const taxAmount = subtotal * (Number(data.tax) / 100);
    const total = subtotal + taxAmount;

    return (
        <div className="template6">
            {/* ---------- Invoice Header ---------- */}
            <div className="invoice-header6">
                <div className="company-section6">
                    <h1 className="invoice-title">INVOICE</h1>
                    <div className="invoice-details6">
                        <p>INVOICE NO. {data.invoice?.number || "N/A"}</p>
                        <p>DATE: {data.invoice?.date || "N/A"}</p>
                    </div>
                </div>
                <div className="logo-placeholder">
                    {data.logo ? <img src={data.logo} alt="Logo" style={{maxHeight: 60}} /> : "Your LOGO"}
                </div>
            </div>

            {/* Company Info */}
            <div className="company-name6">{data.company?.name || "Your Company Name"}</div>
            <div className="company-details">
                <p>{data.company?.address ? data.company.address.split('\n')[0] : "Company Address"}</p>
                <p>{data.company?.address ? data.company.address.split('\n').slice(1).join(', ') : null}</p>
                <p>{data.company?.phone || "N/A"}</p>
                <p>{data.company?.email || "N/A"}</p>
            </div>

            <div className="invoice-content">

            {/* ---------- Billing and Shipping ---------- */}
            <div className="row mb-4 pt-4">
                <div className="col-md-6 mb-3 mb-md-0">
                    <h3 className='mb-2 fw-bold'>Billing Information</h3>
                    <p className="mb-1"><strong>Name:</strong> {data.billing?.name }</p>
                    <p className="mb-1"><strong>Address:</strong> {data.billing?.address }</p>
                    <p className="mb-1"><strong>Phone:</strong> {data.billing?.phone }</p>
                    <p className="mb-1"><strong>Email:</strong> {data.billing?.email }</p>
                </div>
                <div className="col-md-6 text-start text-md-end">
                    <h3 className='mb-2 fw-bold'>Shipping Information</h3>
                    <p className="mb-1"><strong>Name:</strong> {data.shipping?.name }</p>
                    <p className="mb-1"><strong>Address:</strong> {data.shipping?.address }</p>
                    <p className="mb-1"><strong>Phone:</strong> {data.shipping?.phone }</p>
                    <p className="mb-1"><strong>Email:</strong> {data.shipping?.email }</p>
                </div>
            </div>
                
                {/* ---------- Billing Section  

                {/* ---------- Items Table ---------- */}
                <div className="items-section">
                    <table className="items-table6">
                        <thead>
                            <tr>
                                <th>QTY</th>
                                <th>DESCRIPTION</th>
                                <th>UNIT COST</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(data.items) && data.items.length > 0 ? (
                                data.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.quantity || 0}</td>
                                        <td>
                                            <strong>{item.name || "Item"}</strong>
                                            {item.description && (
                                                <>
                                                    <br />
                                                    <span style={{ fontSize: '12px', color: '#666' }}>
                                                        {item.description}
                                                    </span>
                                                </>
                                            )}
                                        </td>
                                        <td>{currencySymbol}{Number(item.price || 0).toFixed(2)}</td>
                                        <td>{currencySymbol}{(item.total ?? (Number(item.quantity || 0) * Number(item.price || 0))).toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>No items added</td>
                                </tr>
                            )}
                            {/* Add empty rows to match the reference design */}
                            {Array.isArray(data.items) && data.items.length < 8 &&
                                Array.from({ length: 5 - data.items.length }, (_, i) => (
                                    <tr key={`empty-${i}`}>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* ---------- Bottom Section ---------- */}
                <div className="bottom-section">
                    <div className="notes-section">
                        <div className="notes-header">
                            <h5>Special Notes and Terms:</h5>
                        </div>
                        <div className="notes-content">
                            <p>{data.notes || "No notes"}</p>
                        </div>
                    </div>
                    
                    <div className="totals-section6">
                        <div className="totals-box6">
                            <div className="total-row6">
                                <span>SUB TOTAL</span>
                                <span>{currencySymbol}{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="total-row6">
                                <span>DISCOUNT</span>
                                <span>{currencySymbol}0.00</span>
                            </div>
                            <div className="total-row6">
                                <span>TAX</span>
                                <span>{currencySymbol}{taxAmount.toFixed(2)}</span>
                            </div>
                            <div className="grand-total6">
                                <span>TOTAL</span>
                                <span>{currencySymbol}{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------- Thank You Message ---------- */}
                <div className="thank-you">
                    It has been a pleasure doing business with you. Thank you.
                </div>
            </div>
        </div>
    );
};

export default Template6;