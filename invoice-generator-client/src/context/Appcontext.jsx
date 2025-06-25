import { Ship } from 'lucide-react';
import { createContext } from 'react';
import { useState } from 'react';

export const AppContext = createContext();

const InitialInvoiceData = {
  Title: "New Invoice",
  Billing: {
    Name: "",
    Phone: "",
    Email: "",
    Address: "",
  },
  Shipping: {
    Name: "",
    Phone: "",
    Email: "",
    Address: "",
  },
  Invoice: {
    Number: "",
    Date: new Date().toISOString().split('T')[0],
    DueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
  },
  Account: {
    AccountName: "",
    AccountNumber: "",
    IfscCode: "",
  },
  Company: {
    Name: "",
    Address: "",
    Phone: "",
    Email: "",
  },
  Tax: 0,
  Notes: "",

  Items: [
    {
      Name: "",
      Description: "",
      Qty: 1,
      Price: 0,
      Total: 0,
    },
  ],
  logo: null

}

function AppcontextProvider({ children }) {
    const [InvoiceTitle, setInvoiceTitle] = useState("New Invoice")
    const [InvoiceData, setInvoiceData] = useState(InitialInvoiceData);
    const [SelectedTemplated,SetSelectedTemplate] = useState("template1");
    
    const contextvalue = {
        InvoiceTitle,
        setInvoiceTitle,
        InvoiceData,
        setInvoiceData,
        SelectedTemplated,
        SetSelectedTemplate,
        InitialInvoiceData,
    }

  return (
    <AppContext.Provider value={contextvalue}>
      {children}
    </AppContext.Provider>
  )
}

export default AppcontextProvider;