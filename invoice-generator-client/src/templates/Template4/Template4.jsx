const Template4 = ({ data }) => {
    const currencySymbol = data.currencySymbol || "₹";
    const subtotal = Array.isArray(data.items)
        ? data.items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0)
        : 0;
    const taxAmount = subtotal * (Number(data.tax) / 100);
    const total = subtotal + taxAmount;

    return (
        <div className="Template4 border rounded mx-auto my-4 px-sm-4 py-3 w-100">
            {/* Invoice Header */}
            <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                    {data.logo && (
                        <div className="mb-2">
                            <img src={data.logo} alt="Company logo" width={98} />
                        </div>
                    )}
                    <h2 className="mb-1 company-title">{data.company?.name || "Company Name"}</h2>
                    <p className="mb-1 company-address">{data.company?.address || "Company Address"}</p>
                    <p className="mb-1 company-phone">Phone: {data.company?.phone || "N/A"}</p>
                    <p className="mb-1 company-email">Email: {data.company?.email || "N/A"}</p>
                </div>
                <div className="col-md-6 text-start text-md-end">
                    <h1 className='mb-2 invoice-title'>Invoice</h1>
                    <p className="mb-1"><strong>Invoice Number:</strong> {data.invoice?.number || "N/A"}</p>
                    <p className="mb-1"><strong>Invoice Date:</strong> {data.invoice?.date || "N/A"}</p>
                    <p className="mb-1"><strong>Due Date:</strong> {data.invoice?.dueDate || "N/A"}</p>
                    <p className="mb-1"><strong>Payment Date:</strong> {data.invoice?.paymentDate || "N/A"}</p>
                </div>
            </div>

            <hr className="my-3 orange-boarder" />

            {/* Billing and Shipping Section */}
            <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                    <h5 className='mb-2'>Billing Information</h5>
                    <p className="mb-1"><strong>Name:</strong> {data.billing?.name || "Billing Name"}</p>
                    <p className="mb-1"><strong>Address:</strong> {data.billing?.address || "Billing Address"}</p>
                    <p className="mb-1"><strong>Phone:</strong> {data.billing?.phone || "N/A"}</p>
                    <p className="mb-1"><strong>Email:</strong> {data.billing?.email || "N/A"}</p>
                </div>
                <div className="col-md-6 text-start text-md-end">
                    <h5 className='mb-2'>Shipping Information</h5>
                    <p className="mb-1"><strong>Name:</strong> {data.shipping?.name || "Shipping Name"}</p>
                    <p className="mb-1"><strong>Address:</strong> {data.shipping?.address || "Shipping Address"}</p>
                    <p className="mb-1"><strong>Phone:</strong> {data.shipping?.phone || "N/A"}</p>
                    <p className="mb-1"><strong>Email:</strong> {data.shipping?.email || "N/A"}</p>
                </div>
            </div>

            {/* items Section */}
            <div className="mb-4">
                <h5 className="mb-3">Items</h5>
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data.items) && data.items.length > 0 ? (
                            data.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name || "Item"}</td>
                                    <td>{item.description || "Description"}</td>
                                    <td>{item.quantity || 0}</td>
                                    <td>{currencySymbol}{Number(item.price || 0).toFixed(2)}</td>
                                    <td>{currencySymbol}{(item.total ?? (Number(item.quantity || 0) * Number(item.price || 0))).toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">No items added</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* total Section */}
            <div className="mb-4 text-end">
                <p><strong>Subtotal:</strong> {currencySymbol}{subtotal.toFixed(2)}</p>
                <p><strong>Tax ({data.tax || 0}%):</strong> {currencySymbol}{taxAmount.toFixed(2)}</p>
                <h4 className="fw-bold">Total: {currencySymbol}{total.toFixed(2)}</h4>
            </div>

            {/* Bank Account Section */}
            {data.account && (
                <div className="mb-4">
                    <h5 className="mb-2">Bank Account Details</h5>
                    <p className="mb-1"><strong>Account Name:</strong> {data.account.accountName || "N/A"}</p>
                    <p className="mb-1"><strong>Account Number:</strong> {data.account.accountNumber || "N/A"}</p>
                    <p className="mb-1"><strong>IFSC Code:</strong> {data.account.ifscCode || "N/A"}</p>
                </div>
            )}

            {/* notes Section */}
            {data.notes && (
                <div className="mb-4">
                    <h5 className="mb-2">Notes</h5>
                    <p>{data.notes}</p>
                </div>
            )}
        </div>
    );
};

export default Template4;