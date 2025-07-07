import { Ship } from 'lucide-react';
import { createContext } from 'react';
import { useState } from 'react';

export const AppContext = createContext();

const InitialInvoiceData = {
  title: "Invoice",
  billing: {
    name: "",
    phone: "",
    email: "",
    address: "",
  },
  shipping: {
    name: "",
    phone: "",
    email: "",
    address: "",
  },
  invoice: {
    number: "",
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
    paymentDate: "",
  },
  account: {
    accountName: "",
    accountNumber: "",
    ifscCode: "",
  },
  company: {
    name: "",
    address: "",
    phone: "",
    email: "",
  },
  tax: 0,
  notes: "",
  items: [
    {
      name: "",
      description: "",
      quantity: 1,
      price: 0,
      total: 0,
    },
  ],
  logo: null,
  template: "template1",
  thumbnailUrl: ""
}

function AppcontextProvider({ children }) {
    const [Invoicetitle, setInvoicetitle] = useState("Invoice")
    const [InvoiceData, setInvoiceData] = useState(InitialInvoiceData);
    const [template,Settemplate] = useState("template1");
    
    const baseURL = "http://localhost:8080/api";

    const contextvalue = {
        Invoicetitle,
        setInvoicetitle,
        InvoiceData,
        setInvoiceData,
        template,
        Settemplate,
        InitialInvoiceData,
        baseURL
    }

  return (
    <AppContext.Provider value={contextvalue}>
      {children}
    </AppContext.Provider>
  )
}

export default AppcontextProvider;
export { InitialInvoiceData };