import React from "react";
import { Phone } from "lucide-react";
import './Template2.css';

/**
 * Template2 expects a prop named `data` (like Template1).
 * This fix ensures all fields are read from `data`.
 */
const Template2 = ({ data }) => {
  // Defensive fallback for missing data
  if (!data) return <div>No invoice data provided.</div>;

  // Calculate subtotal, tax, total if not provided (for robustness)
  const subtotal =
    typeof data.subtotal === "number"
      ? data.subtotal
      : Array.isArray(data.items)
      ? data.items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0)
      : 0;
  const taxRate = data.taxRate ?? data.tax ?? 0;
  const taxAmount =
    typeof data.taxAmount === "number"
      ? data.taxAmount
      : (subtotal * taxRate) / 100;
  const total =
    typeof data.total === "number"
      ? data.total
      : subtotal + taxAmount;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans antialiased">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden" style={{ maxWidth: "850px" }}>
        <div className="p-8">
          {/* Header Section */}
          <div className="mb-6 text-center">
            <div className="text-gray-600 text-4xl sm:text-5xl font-bold mb-2">
              {data.title || "INVOICE"}
            </div>
            <div className="text-gray-800 text-lg font-medium">
              ID: #{data.invoiceNumber}
            </div>
          </div>
          <hr className="my-4 border-gray-200" />

          {/* Company Logo/Name Section */}
          <div className="text-center mb-8">
            {data.companyLogo && (
              <div className="flex justify-center mb-2">
                <img src={data.companyLogo} alt="Logo" className="footer-logo" />
              </div>
            )}
            <div className="text-5xl font-extrabold text-blue-600 mb-2">
              {data.companyName}
            </div>
            <p className="text-sm text-gray-600">{data.companyAddress}</p>
            <p className="text-sm text-gray-600 flex items-center justify-center mt-1">
              <Phone className="w-3 h-3 mr-1 text-gray-500" /> {data.companyPhone}
            </p>
          </div>

          {/* Invoice and Bill To Section */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
              <h3 className="text-gray-600 text-lg font-semibold mb-2">Bill To:</h3>
              <ul className="text-gray-700 text-base space-y-1">
                <li><span className="text-blue-600 font-semibold">{data.billingName}</span></li>
                <li>{data.billingAddress}</li>
                <li><Phone className="w-3 h-3 inline-block mr-1 text-gray-500" /> {data.billingPhone}</li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 text-left sm:text-right">
              <h3 className="text-gray-600 text-lg font-semibold mb-2">Invoice Details:</h3>
              <ul className="text-gray-700 text-base space-y-1">
                <li>
                  <span className="font-bold">ID:</span> #{data.invoiceNumber}
                </li>
                <li>
                  <span className="font-bold">Creation Date: </span>{data.invoiceDate}
                </li>
                {data.dueDate && (
                  <li>
                    <span className="font-bold">Due Date: </span>{data.dueDate}
                  </li>
                )}
                {data.paymentDate && (
                  <li>
                    <span className="font-bold">Payment Date: </span>{data.paymentDate}
                  </li>
                )}
                <li>
                  <span className="font-bold">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold
                    ${data.invoiceStatus === 'Unpaid' ? 'bg-green-100 text-green-800' :
                      data.invoiceStatus === 'Due' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'}`}>
                    {data.invoiceStatus || "Paid"}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tl-lg">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tr-lg">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(data.items) && data.items.length > 0 ? (
                  data.items.map((item, index) => (
                    <tr key={item.id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {item.qty ?? item.Qty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {data.currencySymbol}{(item.unitPrice ?? item.Price)?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {data.currencySymbol}{((item.qty ?? item.Qty) * (item.unitPrice ?? item.Price)).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-400">No items</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Notes and Totals Section */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div className="w-full sm:w-2/3 mb-6 sm:mb-0">
              <p className="text-gray-600 text-sm italic">
                {data.notes?.content || data.notes || ""}
              </p>
            </div>
            <div className="w-full sm:w-1/3 flex flex-col items-end space-y-2">
              <div className="flex justify-between w-full text-gray-700 text-base">
                <span className="font-semibold">SubTotal</span>
                <span>{data.currencySymbol}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-full text-gray-700 text-base">
                <span className="font-semibold">Tax ({taxRate}%)</span>
                <span>{data.currencySymbol}{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-full text-gray-900 text-2xl font-bold mt-4 pt-2 border-t border-gray-200">
                <span>Total Amount</span>
                <span>{data.currencySymbol}{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Footer Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 sm:mb-0">Thank you for your purchase</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2;