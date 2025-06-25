import './Template1.css';


const Template1 = ({ data }) => {
    return (
        <div className="template1 border rounded mx-auto my-4 px-sm-4 py-3 w-100">
            {/* Invoice Header */}
            <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                    {data.companyLogo && (
                        <div className="mb-2">
                            <img src={data.companyLogo} alt="Company logo" width={98} />
                        </div>
                    )}
                    <h2 className="mb-1 company-title">{data.companyName}</h2>
                    <p className="mb-1 company-address">{data.companyAddress}</p>
                    <p className="mb-1 company-phone">Phone: {data.companyPhone}</p>
                </div>
                <div className="col-md-6 text-start text-md-end">
                    <h1 className='mb-2 invoice-title'>Invoice</h1>
                    <p className="mb-1"><strong>Invoice Number:</strong> {data.invoiceNumber}</p>
                    <p className="mb-1"><strong>Invoice Date:</strong> {data.invoiceDate}</p>
                    <p className="mb-1"><strong>Due Date:</strong> {data.dueDate}</p>
                    <p className="mb-1"><strong>Payment Date:</strong> {data.paymentDate}</p>
                </div>
            </div>

            <hr className="my-3 orange-boarder" />

            {/* Billing and Shipping Section */}
            <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                    <h5 className='mb-2'>Billing Information</h5>
                    <p className="mb-1"><strong>Name:</strong> {data.billingName}</p>
                    <p className="mb-1"><strong>Address:</strong> {data.billingAddress}</p>
                    <p className="mb-1"><strong>Phone:</strong> {data.billingPhone}</p>
                </div>
                <div className="col-md-6 text-start text-md-end">
                    <h5 className='mb-2'>Shipping Information</h5>
                    <p className="mb-1"><strong>Name:</strong> {data.shippingName}</p>
                    <p className="mb-1"><strong>Address:</strong> {data.shippingAddress}</p>
                    <p className="mb-1"><strong>Phone:</strong> {data.shippingPhone}</p>
                </div>
            </div>

            {/* Items Section */}
            <div className="mb-4">
                <h5 className="mb-3">Items</h5>
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data.items) && data.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td>{item.Qty}</td>
                                <td>{data.currencySymbol}{item.Price}</td>
                                <td>{data.currencySymbol}{item.Qty * item.Price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Total Section */}
            <div className="mb-4 text-end">
                <p><strong>Subtotal:</strong> {data.currencySymbol}{data.subtotal?.toFixed(2)}</p>
                <p><strong>Tax ({data.tax}%):</strong> {data.currencySymbol}{data.taxAmount?.toFixed(2)}</p>
                <h4 className="fw-bold">Total: {data.currencySymbol}{data.total?.toFixed(2)}</h4>
            </div>

            {/* Bank Account Section */}
            <div className="mb-4">
                <h5 className="mb-2">Bank Account Details</h5>
                <p className="mb-1"><strong>Account Name:</strong> {data.accountName}</p>
                <p className="mb-1"><strong>Account Number:</strong> {data.accountNumber}</p>
                <p className="mb-1"><strong>IFSC Code:</strong> {data.accountIfsc}</p>
            </div>

            {/* Notes Section */}
            {data.notes && data.notes.content && (
                <div className="mb-4">
                    <h5 className="mb-2">Notes</h5>
                    <p>{data.notes.content}</p>
                </div>
            )}
        </div>
    );
};

export default Template1;
