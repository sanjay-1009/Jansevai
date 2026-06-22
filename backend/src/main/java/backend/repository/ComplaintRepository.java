package backend.repository;
import java.util.List;

import backend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository
extends JpaRepository<Complaint,Integer>{

    List<Complaint>
    findByMobileNumber(
        String mobileNumber
    );

}