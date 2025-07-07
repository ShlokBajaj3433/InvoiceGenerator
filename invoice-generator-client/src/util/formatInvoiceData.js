function formatInvoiceData(InvoiceData) {
    const {
        title = "",
        Company = {},
        Invoice = {},
        Account = {},
        Billing = {},
        Shipping = {},
        tax = 0,
        notes = "",
        items = [],
        logo = ""
    } = InvoiceData || {};

    const currencySymbol = "₹";
    // Map items to the format expected by the template
    const formattedItems = (Array.isArray(items) ? items : []).map(item => ({
        description: item?.description || item?.name || "",
        quantity: Number(item?.quantity) || 0,
        price: Number(item?.price) || 0,
    }));

    const subtotal = formattedItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const taxAmount = subtotal * (Number(tax) / 100);
    const total = subtotal + taxAmount;

    return {
        title,
        companyName: Company.name || "",
        companyAddress: Company.address || "",
        companyPhone: Company.phone || "",
        companyLogo: logo,
        invoiceNumber: Invoice.number || "",
        invoiceDate: Invoice.date || "",
        dueDate: Invoice.dueDate || "",
        paymentDate: Invoice.paymentDate || "",
        accountName: Account.AccountName || Account.accountName || "",
        accountNumber: Account.AccountNumber || Account.accountNumber || "",
        accountIfsc: Account.IfscCode || Account.ifscCode || "",
        billingName: Billing.name || "",
        billingAddress: Billing.address || "",
        billingPhone: Billing.phone || "",
        shippingName: Shipping.name || "",
        shippingAddress: Shipping.address || "",
        shippingPhone: Shipping.phone || "",
        currencySymbol,
        tax: Number(tax) || 0,
        items: formattedItems,
        notes,
        subtotal,
        taxAmount,
        total
    }
}

export const formatDate = (dateStr) => {
    if (!dateStr) {
        return "N/A";
    }
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
};

export { formatInvoiceData };