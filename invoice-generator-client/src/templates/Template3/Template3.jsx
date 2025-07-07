const Template3 = ({ data }) => {
  const currencySymbol = "₹";

  // Calculate totals safely
  const subtotal = Array.isArray(data.items)
    ? data.items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0)
    : 0;

  const taxAmount = subtotal * (Number(data.tax) / 100);
  const total = subtotal + taxAmount;

  return (
    <div className="container bg-white p-4 mt-4 shadow rounded" style={{ fontSize: '0.9rem' }}>
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          {data.logo && (
            <img
              src={data.logo}
              alt="Company Logo"
              className="mb-2"
              style={{ height: '50px' }}
            />
          )}
          <h4 className="fw-bold">{data.company?.name || "Company Name"}</h4>
          <p className="text-muted mb-0">{data.company?.address || "Company Address"}</p>
          <p className="text-muted mb-0">{data.company?.phone || "N/A"}</p>
          <p className="text-muted mb-0">{data.company?.email || "N/A"}</p>
        </div>
        <div className="col-md-6 text-md-end">
          <h1 className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>{data.title || 'INVOICE'}</h1>
          <div className="bg-light p-3 rounded">
            <div className="row">
              <div className="col-6 text-start">Invoice Number:</div>
              <div className="col-6 text-end">{data.invoice?.number || "N/A"}</div>
              <div className="col-6 text-start">Invoice Date:</div>
              <div className="col-6 text-end">{data.invoice?.date || "N/A"}</div>
              <div className="col-6 text-start">Due Date:</div>
              <div className="col-6 text-end">{data.invoice?.dueDate || "N/A"}</div>
              <div className="col-6 text-start">Payment Date:</div>
              <div className="col-6 text-end">{data.invoice?.paymentDate || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing and Shipping */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h6 className="fw-semibold mb-2">Billing Information</h6>
          <p className="fw-medium">{data.billing?.name || "Billing Name"}</p>
          <p className="text-muted mb-0">{data.billing?.address || "Billing Address"}</p>
          <p className="text-muted mb-0">{data.billing?.phone || "N/A"}</p>
          <p className="text-muted">{data.billing?.email || "N/A"}</p>
        </div>
        <div className="col-md-6">
          <h6 className="fw-semibold mb-2">Shipping Information</h6>
          <p className="fw-medium">{data.shipping?.name || "Shipping Name"}</p>
          <p className="text-muted mb-0">{data.shipping?.address || "Shipping Address"}</p>
          <p className="text-muted mb-0">{data.shipping?.phone || "N/A"}</p>
          <p className="text-muted">{data.shipping?.email || "N/A"}</p>
        </div>
      </div>

      {/* items Table */}
      <div className="table-responsive mb-4">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th className="text-end">Quantity</th>
              <th className="text-end">Rate</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data.items) && data.items.length > 0 ? (
              data.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name || "Item"}</td>
                  <td>{item.description || "Description"}</td>
                  <td className="text-end">{item.quantity || 0}</td>
                  <td className="text-end">
                    {currencySymbol}{Number(item.price || 0).toFixed(2)}
                  </td>
                  <td className="text-end">
                    {currencySymbol}{(item.total ?? (Number(item.quantity || 0) * Number(item.price || 0))).toFixed(2)}
                  </td>
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

      {/* totals */}
      <div className="row justify-content-end mb-4">
        <div className="col-md-6">
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>{currencySymbol}{subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Tax ({data.tax || 0}%):</span>
            <span>{currencySymbol}{taxAmount.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between border-top pt-2 mt-2 fw-bold">
            <span>Total:</span>
            <span>{currencySymbol}{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Bank Account Info */}
      {data.account && (
        <div className="mb-4">
          <h6 className="fw-semibold mb-2">Bank Account Details</h6>
          <div className="row">
            <div className="col-md-4">
              <p className="text-muted mb-0">Account Name</p>
              <p>{data.account.accountName || "N/A"}</p>
            </div>
            <div className="col-md-4">
              <p className="text-muted mb-0">Account Number</p>
              <p>{data.account.accountNumber || "N/A"}</p>
            </div>
            <div className="col-md-4">
              <p className="text-muted mb-0">IFSC Code</p>
              <p>{data.account.ifscCode || "N/A"}</p>
            </div>
          </div>
        </div>
      )}

      {/* notes */}
      <div className="mb-3">
        <h6 className="fw-semibold">Notes</h6>
        <p className="text-muted">{data.notes || "No notes"}</p>
      </div>
    </div>
  );
};

export default Template3;