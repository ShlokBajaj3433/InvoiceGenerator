package in.ShlokBajaj.InvoiceGeneratorApi.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String clerkUserId;
    private String email;
    private String firstName;
    private String lastName;
}
