function formatInvoiceData(InvoiceData) {
    const {
        title,
        Company = {},
        Invoice = {},
        Account = {},
        Billing = {},
        Shipping = {},
        Tax = 0,
        Notes = "",
        Items = [],
        logo = ""
    } = InvoiceData || {};

    const currencySymbol = "₹";
    // Map Items to the format expected by the template
    const items = (Array.isArray(Items) ? Items : []).map(item => ({
        description: item.Description || item.Name || "",
        Qty: Number(item.Qty) || 0,
        Price: Number(item.Price) || 0,
    }));

    const subtotal = items.reduce((acc, item) => acc + (item.Qty * item.Price), 0);
    const taxAmount = subtotal * (Number(Tax) / 100);
    const total = subtotal + taxAmount;

    return {
        title,
        companyName: Company.Name,
        companyAddress: Company.Address,
        companyPhone: Company.Phone,
        companyLogo: logo,
        invoiceNumber: Invoice.Number,
        invoiceDate: Invoice.Date,
        dueDate: Invoice.DueDate,
        paymentDate: Invoice.paymentDate,
        accountName: Account.AccountName,
        accountNumber: Account.AccountNumber,
        accountIfsc: Account.IfscCode,
        billingName: Billing.Name,
        billingAddress: Billing.Address,
        billingPhone: Billing.Phone,
        shippingName: Shipping.Name,
        shippingAddress: Shipping.Address,
        shippingPhone: Shipping.Phone,
        currencySymbol,
        tax: Tax,
        items,
        notes: { content: Notes },
        subtotal,
        taxAmount,
        total
    }
};

export { formatInvoiceData };