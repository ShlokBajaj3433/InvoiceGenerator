import axios from "axios";

export const saveInvoice = (baseURL, payload) => {
    return axios.post(`${baseURL}/invoices`, payload);
};

export const getAllInvoice = (baseURL) =>{
    return axios.get(`${baseURL}/invoices`)
}


export const deleteInvoice = (baseURL, id) => {
    return axios.delete(`${baseURL}/invoices/${id}`)
}

export const sendInvoice = (baseURL, formData) => {
    return axios.post(`${baseURL}/invoices/sendInvoice`, formData)
}