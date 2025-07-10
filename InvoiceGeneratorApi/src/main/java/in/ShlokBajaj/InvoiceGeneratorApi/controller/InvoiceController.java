package in.ShlokBajaj.InvoiceGeneratorApi.controller;

import java.io.File;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import in.ShlokBajaj.InvoiceGeneratorApi.entity.Invoice;
import in.ShlokBajaj.InvoiceGeneratorApi.service.EmailService;
import in.ShlokBajaj.InvoiceGeneratorApi.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invoices")
@CrossOrigin("*")
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice)
    {
            return ResponseEntity.ok(invoiceService.saveInvoice(invoice));
    }

    @GetMapping()
    public ResponseEntity <List<Invoice>> fetchInvoices(Authentication authentication){
        return ResponseEntity.ok(invoiceService.fetchInvoices(authentication.getName()));
    }

    @PostMapping("/sendInvoice")
    @CrossOrigin(origins = "*") // Optional, but explicit
    public ResponseEntity<String> sendInvoice(@RequestPart("file") MultipartFile file, @RequestPart("email") String customerEmail) {
        try {
            emailService.sendInvoiceEmail(customerEmail, file);
            return ResponseEntity.ok("Invoice sent successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error sending invoice: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable String id, Authentication authentication){
        if (authentication.getName() !=  null) {
            
            invoiceService.deleteInvoice(id, authentication.getName());
            return ResponseEntity.noContent().build();
        }
        throw new RuntimeException("Authentication required to delete invoice");
        
    }
    
    
}
