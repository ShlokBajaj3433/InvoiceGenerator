import './Template5.css';

const Template5 = ({ data }) => {
    const currencySymbol =  "₹";

    // Calculate totals safely
    const subtotal = Array.isArray(data.items)
        ? data.items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0)
        : 0;

    const taxAmount = subtotal * (Number(data.tax) / 100);
    const total = subtotal + taxAmount;

    return (
        <div className="template1">
            {/* ---------- Invoice Header ---------- */}
            <div className="invoice-header5">
                <div className="company-section">
                    <div className="logo-placeholder">{data.logo && (
                        <div className="mb-2">
                            <img src={data.logo} alt="Company logo" width={98} />
                        </div>
                    )}</div>
                    <div className="company-name">{data.company?.name || "Company Name"}</div>
                    <div className="company-details">
                        <p>{data.company?.phone && `📞 ${data.company.phone}`}</p>
                        <p>{data.company?.email && `📧 ${data.company.email}`}</p>
                        <p>{data.company?.address && `📍 ${data.company.address}`}</p>
                    </div>
                </div>

                <div className="invoice-title-section">
                    <h1 className="invoice-title">{data.title || "Invoice"}</h1>
                    <div className="invoice-details">
                        <p><strong>Invoice #:</strong> {data.invoice?.number}</p>
                        <p><strong>Invoice Date:</strong> {data.invoice?.date}</p>
                        <p><strong>Due Date:</strong> {data.invoice?.dueDate}</p>
                        <p><strong>Payment Date:</strong> {data.invoice?.paymentDate}</p>
                    </div>
                </div>
            </div>

            <div className="invoice-content">
                {/* ---------- Billing and Shipping ---------- */}
                <div className="billing-section">
                    <div className="billing-info">
                        <h5>Billing Information</h5>
                        <p><strong>{data.billing?.name}</strong></p>
                        <p>{data.billing?.address}</p>
                        <p>{data.billing?.phone}</p>
                        <p>{data.billing?.email}</p>
                    </div>
                    <div className="billing-info">
                        <h5>Shipping Information</h5>
                        <p><strong>{data.shipping?.name}</strong></p>
                        <p>{data.shipping?.address}</p>
                        <p>{data.shipping?.phone}</p>
                        <p>{data.shipping?.email}</p>
                    </div>
                </div>

                {/* ---------- Items Section ---------- */}
                <div className="items-section">
                    <h5>Item Descriptions</h5>
                    <table className="items-table5">
                        <thead>
                            <tr>
                                <th>Item Description</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(data.items) && data.items.length > 0 ? (
                                data.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <strong>{item.name}</strong>
                                            <br />
                                            <small style={{ color: '#666' }}>{item.description}</small>
                                        </td>
                                        <td>{item.quantity || 0}</td>
                                        <td>{currencySymbol}{Number(item.price || 0).toFixed(2)}</td>
                                        <td>{currencySymbol}{(item.total ?? (Number(item.quantity || 0) * Number(item.price || 0))).toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>No items added</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ---------- Totals Section ---------- */}
                <div className="totals-section5">
                    <div className="payment-info">
                        <h5>Payment Info</h5>
                        {data.account && (
                            <div className="payment-details">
                                <p><strong>Account Name:</strong> {data.account.accountName}</p>
                                <p><strong>Account Number:</strong> {data.account.accountNumber}</p>
                                <p><strong>IFSC Code:</strong> {data.account.ifscCode}</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="totals-box5">
                        <div className="total-row">
                            <span>Sub Total</span>
                            <span>{currencySymbol}{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="total-row">
                            <span>Tax {data.tax || 0}%</span>
                            <span>{currencySymbol}{taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="total-row">
                            <span>Discount</span>
                            <span>{currencySymbol}0.00</span>
                        </div>
                        <div className="grand-total">
                            <span>Grand Total</span>
                            <span>{currencySymbol}{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* ---------- Terms & Conditions ---------- */}
                {data.notes && (
                    <div className="additional-section">
                        <h5>Terms & Conditions</h5>
                        <p>{data.notes}</p>
                    </div>
                )}

                {/* ---------- Thank You Message ---------- */}
                <div className="thank-you">
                    THANKS YOUR BUSINESS!
                </div>
            </div>
        </div>
    );
};

export default Template5;
