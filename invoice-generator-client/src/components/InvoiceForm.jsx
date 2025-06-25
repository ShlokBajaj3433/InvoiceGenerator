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
      Items: [...prev.Items, { Name: "", Description: "", Qty: 1, Price: 0, Total: 0 }]
    }));
  };

  const deleteItem = (index) => {
    const items = InvoiceData.Items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({ ...prev, Items: items }));
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
    const items = [...InvoiceData.Items];
    items[index][field] = value;
    if (field === "Qty" || field === "Price") {
      items[index].Total = (Number(items[index].Qty) || 0) * (Number(items[index].Price) || 0);
    }
    setInvoiceData((prev) => ({ ...prev, Items: items }));
  };

  const calculateTotal = () => {
    const items = InvoiceData.Items.map(item => {
      const qty = Number(item.Qty) || 0;
      const price = Number(item.Price) || 0;
      return {
        ...item,
        Total: qty * price
      };
    });

    const SubTotal = items.reduce((sum, item) => sum + (item.Total || 0), 0);
    const taxRate = Number(InvoiceData.Tax) || 0;
    const taxAmount = (SubTotal * taxRate) / 100;
    const grandTotal = SubTotal + taxAmount;

    if (JSON.stringify(items) !== JSON.stringify(InvoiceData.Items)) {
      setInvoiceData(prev => ({ ...prev, Items: items }));
    }

    return { SubTotal, taxAmount, grandTotal };
  };

  const { SubTotal, taxAmount, grandTotal } = calculateTotal();

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
    if (!InvoiceData.Invoice.Number) {
      const newInvoiceNumber = `INV-${Date.now()}`;
      setInvoiceData((prev) => ({
        ...prev,
        Invoice: { ...prev.Invoice, Number: newInvoiceNumber }
      }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(InvoiceData);
  };

  return (
    <form className="invoiceform container py-4">
      <h2 className="form-main-heading text-center mb-4">Invoice Form</h2>

      {/* Company Logo */}
      <div className="mb-4">
        <h4 className="form-section-heading">Company Logo</h4>
        <div className="d-flex align-items-center gap-3">
          <input type="file" accept="image/*" onChange={handleLogoChange} className="form-control" />
          {InvoiceData.logo && (
            <img src={InvoiceData.logo || assets.logo} alt="Company Logo" className="img-thumbnail" style={{ width: '100px', height: '100px' }} />
          )}
        </div>
      </div>

      {/* Company Info */}
      <div className="mb-4">
        <h4 className="form-section-heading">Company Information</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input className="form-control" placeholder="e.g., Acme Corp" value={InvoiceData.Company.Name} onChange={(e) => handleChange("Company", "Name", e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Company Phone</label>
            <input className="form-control" placeholder="e.g., +91 98765 43210" value={InvoiceData.Company.Phone} onChange={(e) => handleChange("Company", "Phone", e.target.value)} />
          </div>
          <div className="col-12">
            <label className="form-label">Company Address</label>
            <input className="form-control" placeholder="Street, City, ZIP" value={InvoiceData.Company.Address} onChange={(e) => handleChange("Company", "Address", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Billing */}
      <div className="mb-4">
        <h4 className="form-section-heading">Bill To</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Billing Name</label>
            <input className="form-control" value={InvoiceData.Billing.Name} onChange={(e) => handleChange("Billing", "Name", e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Billing Phone</label>
            <input className="form-control" value={InvoiceData.Billing.Phone} onChange={(e) => handleChange("Billing", "Phone", e.target.value)} />
          </div>
          <div className="col-12">
            <label className="form-label">Billing Address</label>
            <input className="form-control" value={InvoiceData.Billing.Address} onChange={(e) => handleChange("Billing", "Address", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Shipping */}
      <div className="mb-4">
        <h4 className="form-section-heading">Ship To</h4>
        <div className="d-flex align-items-center mb-2">
          <input type="checkbox" id="sameAsBilling" className="me-2" onChange={(e) => {
            if (e.target.checked) {
              setInvoiceData((prev) => ({
                ...prev,
                Shipping: { ...prev.Billing }
              }));
            }
          }} />
          <label htmlFor="sameAsBilling" className="mb-0">Same as Billing</label>
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Shipping Name</label>
            <input className="form-control" value={InvoiceData.Shipping.Name} onChange={(e) => handleChange("Shipping", "Name", e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Shipping Phone</label>
            <input className="form-control" value={InvoiceData.Shipping.Phone} onChange={(e) => handleChange("Shipping", "Phone", e.target.value)} />
          </div>
          <div className="col-12">
            <label className="form-label">Shipping Address</label>
            <input className="form-control" value={InvoiceData.Shipping.Address} onChange={(e) => handleChange("Shipping", "Address", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="mb-4">
        <h4 className="form-section-heading">Invoice Information</h4>
        <div className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Invoice Number</label>
            <input className="form-control" disabled value={InvoiceData.Invoice.Number} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Invoice Date</label>
            <input className="form-control" type="date" value={InvoiceData.Invoice.Date} onChange={(e) => handleChange("Invoice", "Date", e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Due Date</label>
            <input className="form-control" type="date" value={InvoiceData.Invoice.DueDate} onChange={(e) => handleChange("Invoice", "DueDate", e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Payment Date</label>
            <input className="form-control" type="date" value={InvoiceData.Invoice.paymentDate} onChange={(e) => handleChange("Invoice", "paymentDate", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Item Details */}
<div className="mb-4">
  <h4 className="form-section-heading">Item Details</h4>
  {InvoiceData.Items.map((Item, index) => (
    <div className="border rounded p-3 mb-3" key={index}>
      <div className="row g-3 mb-2">
        <div className="col-md-4">
          <label className="form-label">Item Name</label>
          <input className="form-control" value={Item.Name} placeholder="e.g., Website Hosting" onChange={(e) => handleItemChange(index, "Name", e.target.value)} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Quantity</label>
          <input className="form-control" type="number" value={Item.Qty} placeholder="e.g., 2" onChange={(e) => handleItemChange(index, "Qty", e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Price</label>
          <input className="form-control" type="number" value={Item.Price} placeholder="e.g., 500" onChange={(e) => handleItemChange(index, "Price", e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Total</label>
          <input className="form-control" type="number" value={Item.Total} disabled />
        </div>
      </div>
      <label className="form-label">Description</label>
      <div className="d-flex gap-3">
        <textarea
          className="form-control"
          placeholder="Item description..."
          style={{ resize: 'vertical', minHeight: '60px' }}
          value={Item.Description}
          onChange={(e) => handleItemChange(index, "Description", e.target.value)}
        />
        {InvoiceData.Items.length > 1 && (
          <button type="button" className="btn btn-outline-danger" onClick={() => deleteItem(index)}>
            <Trash />
          </button>
        )}
      </div>
    </div>
  ))}
  <button type="button" className="btn btn-success" onClick={additem}>+ Add Item</button>
</div>

{/* Bank Account Info */}
<div className="mb-4">
  <h4 className="form-section-heading">Bank Account Details</h4>
  <div className="row g-3">
    <div className="col-md-4">
      <label className="form-label">Account Name</label>
      <input className="form-control" placeholder="e.g., John Doe" onChange={(e) => handleChange("Account", "AccountName", e.target.value)} value={InvoiceData.Account.AccountName} />
    </div>
    <div className="col-md-4">
      <label className="form-label">Account Number</label>
      <input className="form-control" placeholder="e.g., 1234567890" onChange={(e) => handleChange("Account", "AccountNumber", e.target.value)} value={InvoiceData.Account.AccountNumber} />
    </div>
    <div className="col-md-4">
      <label className="form-label">IFSC Code</label>
      <input className="form-control" placeholder="e.g., SBIN0001234" onChange={(e) => handleChange("Account", "IfscCode", e.target.value)} value={InvoiceData.Account.IfscCode} />
    </div>
  </div>
</div>

{/* Totals Section */}
<div className="mb-4">
  <h4 className="form-section-heading">Totals</h4>
  <div className="row g-3">
    <div className="col-md-6">
      <div className="d-flex justify-content-between">
        <span>Subtotal:</span>
        <span><strong>₹{SubTotal.toFixed(2)}</strong></span>
      </div>
    </div>
    <div className="col-md-6">
      <div className="d-flex justify-content-between align-items-center">
        <label className="form-label m-0">Tax Rate (%)</label>
        <input className="form-control w-25 ms-2" type="number" value={InvoiceData.Tax} onChange={(e) => setInvoiceData((prev) => ({ ...prev, Tax: e.target.value }))} />
      </div>
    </div>
    <div className="col-md-6 mt-2">
      <div className="d-flex justify-content-between">
        <span>Tax Amount:</span>
        <span><strong>₹{taxAmount.toFixed(2)}</strong></span>
      </div>
    </div>
    <div className="col-md-6 mt-2">
      <div className="d-flex justify-content-between">
        <span>Grand Total:</span>
        <strong>₹{grandTotal.toFixed(2)}</strong>
      </div>
    </div>
  </div>
</div>

{/* Notes Section */}
<div className="mb-4">
  <h4 className="form-section-heading">Additional Notes</h4>
  <textarea className="form-control" rows="3" placeholder="Any special notes or instructions..." onChange={(e) => setInvoiceData((prev) => ({ ...prev, Notes: e.target.value }))} value={InvoiceData.Notes}></textarea>
</div>

{/* Submit */}
<div className="text-center">
  <button type="submit" className="btn btn-primary px-4 py-2" onClick={handleSubmit}>
    Generate Invoice
  </button>
</div>

    </form>
  );
}

export default InvoiceForm;
