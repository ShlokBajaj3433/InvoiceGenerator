import { assets } from '../assets/assets';
import { Trash } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/Appcontext.jsx';
import '../index.css'; 

function InvoiceForm() {
  const { InvoiceData, setInvoiceData } = useContext(AppContext);

  const additem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", description: "", quantity: 1, price: 0, total: 0 }]
    }));
  };

  const deleteItem = (index) => {
    const items = InvoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({ ...prev, items: items }));
  };

  const handleChange = (section, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleItemChange = (index, field, value) => {
    const items = [...InvoiceData.items];
    items[index][field] = value;
    if (field === "quantity" || field === "price") {
      items[index].total = (Number(items[index].quantity) || 0) * (Number(items[index].price) || 0);
    }
    setInvoiceData((prev) => ({ ...prev, items: items }));
  };

  const calculatetotal = () => {
    const items = InvoiceData.items.map(item => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      return {
        ...item,
        total: qty * price
      };
    });

    const Subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
    const taxRate = Number(InvoiceData.tax) || 0;
    const taxAmount = (Subtotal * taxRate) / 100;
    const grandtotal = Subtotal + taxAmount;

    if (JSON.stringify(items) !== JSON.stringify(InvoiceData.items)) {
      setInvoiceData(prev => ({ ...prev, items: items }));
    }

    return { Subtotal, taxAmount, grandtotal };
  };

  const { Subtotal, taxAmount, grandtotal } = calculatetotal();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData((prev) => ({
          ...prev,
          logo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!InvoiceData.invoice.number) {
      const newInvoiceNumber = `INV-${Date.now()}`;
      setInvoiceData((prev) => ({
        ...prev,
        invoice: { ...prev.invoice, number: newInvoiceNumber }
      }));
    }
  }, []);

  return (
    <form className="invoiceform container py-4">
      <h2 className="form-main-heading text-center mb-4">Invoice Form</h2>

      <div className="mb-4">
        <h4 className="form-section-heading">Company Logo</h4>
        <div className="d-flex align-items-center gap-3">
          <input type="file" accept="image/*" onChange={handleLogoChange} className="form-control" />
          {InvoiceData.logo && (
            <img src={InvoiceData.logo || assets.logo} alt="Company Logo" className="img-thumbnail" style={{ width: '100px', height: '100px' }} />
          )}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="form-section-heading">Company Information</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Company name</label>
            <input className="form-control" placeholder="Company name" value={InvoiceData.company.name} onChange={(e) => handleChange("company", "name", e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Company phone</label>
            <input className="form-control" placeholder="e.g., +91 99999 99999" value={InvoiceData.company.phone} onChange={(e) => handleChange("company", "phone", e.target.value)} />
          </div>
          <div className="col-12">
            <label className="form-label">Company Address</label>
            <input className="form-control" placeholder="Street, City, ZIP" value={InvoiceData.company.address} onChange={(e) => handleChange("company", "address", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-4">
        <h4 className="form-section-heading">Bill To</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Billing name</label>
            <input className="form-control" value={InvoiceData.billing.name} onChange={(e) => handleChange("billing", "name", e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Billing Phone</label>
            <input className="form-control" value={InvoiceData.billing.phone} onChange={(e) => handleChange("billing", "phone", e.target.value)} />
          </div>
          <div className="col-12">
            <label className="form-label">Billing address</label>
            <input className="form-control" value={InvoiceData.billing.address} onChange={(e) => handleChange("billing", "address", e.target.value)} />
          </div>
          <div className="col-12">
            <label className="form-label">Billing Email</label>
            <input className="form-control" placeholder="Email" value={InvoiceData.billing.email || ""} onChange={(e) => handleChange("billing", "email", e.target.value)} />
          </div>
        </div>
      </div>
      
      {/* Ship To */}
      <div className="mb-4">
        <h4 className="form-section-heading">Ship To</h4>
        <div className="d-flex align-items-center mb-2">
          <input type="checkbox" id="sameAsBilling" className="me-2" onChange={(e) => {
            if (e.target.checked) {
              setInvoiceData((prev) => ({
                ...prev,
                shipping: { ...prev.billing }
              }));
            }
          }} />
          <label htmlFor="sameAsBilling" className="mb-0">Same as Billing</label>
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Shipping name</label>
            <input className="form-control" value={InvoiceData.shipping.name} onChange={(e) => handleChange("shipping", "name", e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Shipping phone</label>
            <input className="form-control" value={InvoiceData.shipping.phone} onChange={(e) => handleChange("shipping", "phone", e.target.value)} />
          </div>
          <div className="col-12">
            <label className="form-label">Shipping address</label>
            <input className="form-control" value={InvoiceData.shipping.address} onChange={(e) => handleChange("shipping", "address", e.target.value)} />
          </div>
          <div className="col-12">
            <label className="form-label">Shipping Email</label>
            <input className="form-control" placeholder="Email" value={InvoiceData.shipping.email || ""} onChange={(e) => handleChange("shipping", "email", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="form-section-heading">Invoice Information</h4>
        <div className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Invoice number</label>
            <input className="form-control" disabled value={InvoiceData.invoice.number} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Invoice Date</label>
            <input className="form-control" type="date" value={InvoiceData.invoice.date} onChange={(e) => handleChange("invoice", "date", e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Due Date</label>
            <input className="form-control" type="date" value={InvoiceData.invoice.dueDate} onChange={(e) => handleChange("invoice", "dueDate", e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Payment Date</label>
            <input className="form-control" type="date" value={InvoiceData.invoice.paymentDate} onChange={(e) => handleChange("invoice", "paymentDate", e.target.value)} />
          </div>
        </div>
      </div>

{/* Items Section */}
<div className="mb-4">
  <h4 className="form-section-heading">Item Details</h4>
  {InvoiceData.items.map((item, index) => (
    <div key={index} className="mb-3 border rounded p-3">
      <div className="row g-2">
        <div className="col-md-4">
          <input className="form-control" placeholder="Item Name" value={item.name} onChange={(e) => handleItemChange(index, "name", e.target.value)} />
        </div>
        <div className="col-md-2">
          <input className="form-control" placeholder="Qty" type="number" value={item.quantity} onChange={(e) => handleItemChange(index, "quantity", e.target.value)} />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Price" type="number" value={item.price} onChange={(e) => handleItemChange(index, "price", e.target.value)} />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Total" type="number" value={item.total} disabled />
        </div>
      </div>
      <textarea className="form-control mt-2" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, "description", e.target.value)} />
      {InvoiceData.items.length > 1 && (
        <button type="button" className="btn btn-sm btn-danger mt-2" onClick={() => deleteItem(index)}>Remove Item</button>
      )}
    </div>
  ))}
  <button type="button" className="btn btn-success" onClick={additem}>Add Item</button>
</div>

{/* Totals Section */}
<div className="mb-4">
  <h4 className="form-section-heading">Totals</h4>
  <div className="d-flex justify-content-between">
    <div>Subtotal:</div>
    <div>₹{Subtotal.toFixed(2)}</div>
  </div>
  <div className="d-flex justify-content-between">
    <div>Tax Rate (%):</div>
    <input className="form-control w-25" type="number" value={InvoiceData.tax} onChange={(e) => setInvoiceData(prev => ({ ...prev, tax: e.target.value }))} />
  </div>
  <div className="d-flex justify-content-between">
    <div>Tax Amount:</div>
    <div>₹{taxAmount.toFixed(2)}</div>
  </div>
  <div className="d-flex justify-content-between fw-bold">
    <div>Grand Total:</div>
    <div>₹{grandtotal.toFixed(2)}</div>
  </div>
</div>


{/* Bank Account Details */}
<div className="mb-4">
  <h4 className="form-section-heading">Bank Account Details</h4>
  <div className="row g-3">
    <div className="col-12">
      <label className="form-label">Account Name</label>
      <input className="form-control" placeholder="Account Name" value={InvoiceData.account.accountName} onChange={(e) => handleChange("account", "accountName", e.target.value)} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Account Number</label>
      <input className="form-control" placeholder="Account Number" value={InvoiceData.account.accountNumber} onChange={(e) => handleChange("account", "accountNumber", e.target.value)} />
    </div>
    <div className="col-md-6">
      <label className="form-label">IFSC Code</label>
      <input className="form-control" placeholder="IFSC Code" value={InvoiceData.account.ifscCode} onChange={(e) => handleChange("account", "ifscCode", e.target.value)} />
    </div>
  </div>
</div>


{/* Notes Section */}
<div className="mb-4">
  <h4 className="form-section-heading">Notes</h4>
  <textarea className="form-control" rows="3" placeholder="Additional notes..." value={InvoiceData.notes} onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}></textarea>
</div>
    </form>
  );
}

export default InvoiceForm;
