const Template3 = ({ data }) => {
return (
        <div className="container bg-white p-4 mt-4 shadow rounded" style={{ fontSize: '0.9rem' }}>
      
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          {data.companyLogo && (
            <img
              src={data.companyLogo}
              alt="Company Logo"
              className="mb-2"
              style={{ height: '50px' }}
            />
          )}
          <h4 className="fw-bold">{data.companyName}</h4>
          <p className="text-muted mb-0">{data.companyAddress}</p>
          <p className="text-muted mb-0">{data.companyPhone}</p>
        </div>
        <div className="col-md-6 text-md-end">
          <h1 className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>{data.title || 'INVOICE'}</h1>
          <div className="bg-light p-3 rounded">
            <div className="row">
              <div className="col-6 text-start">Invoice Number:</div>
              <div className="col-6 text-end">{data.invoiceNumber}</div>
              <div className="col-6 text-start">Invoice Date:</div>
              <div className="col-6 text-end">{data.invoiceDate}</div>
              <div className="col-6 text-start">Due Date:</div>
              <div className="col-6 text-end">{data.dueDate}</div>
              <div className="col-6 text-start">Payment Date:</div>
              <div className="col-6 text-end">{data.paymentDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing and Shipping */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h6 className="fw-semibold mb-2">Billing Information</h6>
          <p className="fw-medium">{data.billingName}</p>
          <p className="text-muted mb-0">{data.billingAddress}</p>
          <p className="text-muted">{data.billingPhone}</p>
        </div>
        <div className="col-md-6">
          <h6 className="fw-semibold mb-2">Shipping Information</h6>
          <p className="fw-medium">{data.shippingName}</p>
          <p className="text-muted mb-0">{data.shippingAddress}</p>
          <p className="text-muted">{data.shippingPhone}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="table-responsive mb-4">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Description</th>
              <th className="text-end">Quantity</th>
              <th className="text-end">Rate</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items?.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td className="text-end">{item.Qty}</td>
                <td className="text-end">
                  {data.currencySymbol}{parseFloat(item.Price).toFixed(2)}
                </td>
                <td className="text-end">
                  {data.currencySymbol}{(item.Qty * item.Price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="row justify-content-end mb-4">
        <div className="col-md-6">
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>{data.currencySymbol}{data.subtotal?.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Tax ({data.tax}%):</span>
            <span>{data.currencySymbol}{data.taxAmount?.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between border-top pt-2 mt-2 fw-bold">
            <span>Total:</span>
            <span>{data.currencySymbol}{data.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Bank Account Info */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-2">Bank Account Details</h6>
        <div className="row">
          <div className="col-md-4">
            <p className="text-muted mb-0">Account Name</p>
            <p>{data.accountName}</p>
          </div>
          <div className="col-md-4">
            <p className="text-muted mb-0">Account Number</p>
            <p>{data.accountNumber}</p>
          </div>
          <div className="col-md-4">
            <p className="text-muted mb-0">IFSC Code</p>
            <p>{data.accountIfsc}</p>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes?.content && (
        <div className="mb-3">
          <h6 className="fw-semibold">Notes</h6>
          <p className="text-muted">{data.notes.content}</p>
        </div>
      )}
    </div>
  );
};

export default Template3;
