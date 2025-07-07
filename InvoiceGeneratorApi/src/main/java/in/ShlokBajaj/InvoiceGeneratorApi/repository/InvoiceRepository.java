package in.ShlokBajaj.InvoiceGeneratorApi.repository;

import in.ShlokBajaj.InvoiceGeneratorApi.entity.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvoiceRepository extends MongoRepository<Invoice,String> {

}
