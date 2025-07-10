package in.ShlokBajaj.InvoiceGeneratorApi.entity;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "invoice")
public class Invoice {

    @Id
    private String id;
    private String clerkId;
    
    private Company company;
    private Billing billing;
    private Shipping shipping;
    private InvoiceDetails invoice;
    private Account account;
    private List<Item> items;
    private String notes;
    private String logo;
    private double tax;
    private String template;
    private String title;
    private String thumbnailUrl;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant lastUpdatedAt;

    // ---------- Sub-Entities ----------

    @Data
    @NoArgsConstructor
    public static class Company {
        private String name;
        private String phone;
        private String address;
        
    }
    
    @Data
    @NoArgsConstructor
    public static class Billing {
        private String name;
        private String address;
        private String phone;
    }

    @Data
    @NoArgsConstructor
    public static class Shipping {
        private String name;
        private String address;
        private String phone;
    }
    
    @Data
    @NoArgsConstructor
    public static class InvoiceDetails {
        private String number;
        private String date;
        private String dueDate;
        private String paymentDate;
    }

    @Data
    @NoArgsConstructor
        public static class Item {
        private String name;
        private String description;
        private int quantity;
        private double price;
        private double total;
    }

    @Data
    @NoArgsConstructor
    public static class Account{
        
        private String accountName;
        private String accountNumber;
        private String ifscCode;
    }

}