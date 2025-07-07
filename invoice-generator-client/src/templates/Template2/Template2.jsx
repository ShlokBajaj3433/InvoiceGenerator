import './Template2.css';

const Template2 = ({ data }) => {
    const currencySymbol = "₹";

    // Calculate totals safely
    const subtotal = Array.isArray(data.items)
        ? data.items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0)
        : 0;

    const taxAmount = subtotal * (Number(data.tax) / 100);
    const total = subtotal + taxAmount;

    return (
        <div className="invoice-container">
            {/* ---------- Invoice Header ---------- */}
            <div className="invoice-header p-4">
                <div className="company-info">
                    {data.logo && (
                        <div style={{ marginBottom: '10px' }}>
                            <img src={data.logo} alt="Company logo" width={98} />
                        </div>
                    )}
                    <h2>{data.company?.name || "Company Name"}</h2>
                    <p>{data.company?.address || "Company Address"}</p>
                    <p>Phone: {data.company?.phone  }</p>
                </div>

                <div>
                    <h1 className="invoice-title">{data.title || "Invoice"}</h1>
                </div>
            </div>

            {/* ---------- Invoice Details ---------- */}
            <div className="invoice-details">
                <div className="invoice-meta">
                    <p><strong>Invoice#</strong>: {data.invoice?.number  }</p>
                    <p><strong>Invoice Date</strong>: {data.invoice?.date  }</p>
                    <p><strong>Terms</strong>: {data.invoice?.terms || "Due on Receipt"}</p>
                    <p><strong>Due Date</strong>: {data.invoice?.dueDate  }</p>
                    <p><strong>Payment Date</strong>: {data.invoice?.paymentDate  }</p>
                </div>
                <div></div>
            </div>

            {/* ---------- Billing and Shipping ---------- */}
            <div className="billing-shipping">
                <div className="bill-to">
                    <h3>Bill To</h3>
                    <p><strong>{data.billing?.name || "Billing Name"}</strong></p>
                    <p>{data.billing?.address || "Billing Address"}</p>
                    <p>{data.billing?.phone  }</p>
                    <p>{data.billing?.email  }</p>
                </div>
                <div className="ship-to">
                    <h3>Ship To</h3>
                    <p><strong>{data.shipping?.name || "Shipping Name"}</strong></p>
                    <p>{data.shipping?.address || "Shipping Address"}</p>
                    <p>{data.shipping?.phone  }</p>
                    <p>{data.shipping?.email  }</p>
                </div>
            </div>

            {/* ---------- Items Section ---------- */}
            <table className="items-table">
                <thead>
                    <tr>
                        <th className="item-number">#</th>
                        <th className="item-description">Item & Description</th>
                        <th className="item-qty">Qty</th>
                        <th className="item-rate">Rate</th>
                        <th className="item-amount">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data.items) && data.items.length > 0 ? (
                        data.items.map((item, index) => (
                            <tr key={index}>
                                <td className="item-number">{index + 1}</td>
                                <td className="item-description">
                                    <div className="item-name">{item.name || "Item"}</div>
                                    <div className="item-desc">{item.description || "Description"}</div>
                                </td>
                                <td className="item-qty">{item.quantity || 0}.00 Piece</td>
                                <td className="item-rate">{currencySymbol}{Number(item.price || 0).toFixed(2)}</td>
                                <td className="item-amount">{currencySymbol}{(item.total ?? (Number(item.quantity || 0) * Number(item.price || 0))).toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">No items added</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* ---------- Totals Section ---------- */}
            <div className="totals-section">

            {/* ---------- Bank Account Details ---------- */}
            {data.account && (
                <div >
                    <h4>Bank Account Details</h4>
                    <p><strong>Account Name:</strong> {data.account.accountName  }</p>
                    <p><strong>Account Number:</strong> {data.account.accountNumber  }</p>
                    <p><strong>IFSC Code:</strong> {data.account.ifscCode  }</p>
                </div>
            )}
                
                <div className="totals-box2">
                    <div className="total-row">
                        <span>Sub Total</span>
                        <span>{currencySymbol}{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                        <span>Tax Rate</span>
                        <span>{data.tax || 0}%</span>
                    </div>
                    <div className="total-row final-total">
                        <span>Total</span>
                        <span>{currencySymbol}{total.toFixed(2)}</span>
                    </div>
                    <div className="balance-due">
                        <div className="total-row">
                            <span>Balance Due</span>
                            <span>{currencySymbol}{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* ---------- Notes Section ---------- */}
            <div style={{padding: '40px', borderTop: '1px solid #ddd' }}>
                <p>{data.notes }</p>
                              <div className="thanks-terms">
                    <h4 className='text-center'>Thanks for your business.</h4>
                    <h4>Terms & Conditions</h4>
                    <p >Full payment is due upon receipt of this invoice. Late payments may incur additional charges or interest as per the applicable laws.</p>
                </div>
            </div>
        </div>
    );
};

export default Template2;