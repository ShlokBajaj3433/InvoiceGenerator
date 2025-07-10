package in.ShlokBajaj.InvoiceGeneratorApi.repository;

import in.ShlokBajaj.InvoiceGeneratorApi.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserReporitoty extends MongoRepository<User,String> {
    User findByClerkUserId(String clerkUserId);
}
