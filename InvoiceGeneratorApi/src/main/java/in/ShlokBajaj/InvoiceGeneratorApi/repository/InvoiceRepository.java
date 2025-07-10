package in.ShlokBajaj.InvoiceGeneratorApi.repository;

import in.ShlokBajaj.InvoiceGeneratorApi.entity.Invoice;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvoiceRepository extends MongoRepository<Invoice,String> {
    List <Invoice> findByClerkId(String clerkId);

    Optional <Invoice> findByIdAndClerkId(String id, String clerkId);
}
