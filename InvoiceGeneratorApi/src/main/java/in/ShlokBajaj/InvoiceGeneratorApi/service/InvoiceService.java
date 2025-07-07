package in.ShlokBajaj.InvoiceGeneratorApi.service;


import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import in.ShlokBajaj.InvoiceGeneratorApi.entity.Invoice;
import in.ShlokBajaj.InvoiceGeneratorApi.repository.InvoiceRepository;


@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public Invoice saveInvoice(Invoice invoice){
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> fetchInvoices(){
        return invoiceRepository.findAll();
    }

public void deleteInvoice(String invoiceId){
    Invoice existInvoice = invoiceRepository.findById(invoiceId)
        .orElseThrow(() -> new RuntimeException("Invoice with id " + invoiceId + " does not exist"));
    invoiceRepository.delete(existInvoice);
}
    
    
}
