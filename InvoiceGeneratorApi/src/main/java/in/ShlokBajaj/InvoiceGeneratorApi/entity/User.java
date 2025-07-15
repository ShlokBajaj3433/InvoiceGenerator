package in.ShlokBajaj.InvoiceGeneratorApi.entity;

import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Document(collection = "users")
public class User {
    
    @Id
    private String id;
    private String clerkUserId;
    private String email;
    private String firstName;
    private String lastName;
    private String photoUrl;
    @CreatedDate
    private String createdAt;
}
