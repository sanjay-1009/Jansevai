package backend.service;

import backend.entity.Complaint;
import backend.repository.ComplaintRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository repository;

    public ComplaintService(
            ComplaintRepository repository) {
        this.repository = repository;
    }

    public Complaint save(
            Complaint complaint) {

        complaint.setStatus("Pending");

        return repository.save(
                complaint);
    }

    public List<Complaint> getAll() {

        return repository.findAll();
    }
    public Complaint updateStatus(
            Integer id,
            String status) {

        Complaint complaint =
                repository.findById(id)
                        .orElseThrow();

        complaint.setStatus(status);

        return repository.save(
                complaint);
    }
    public void deleteComplaint(
            Integer id) {

        repository.deleteById(id);

    }
    public Complaint getComplaintById(
            Integer id) {

        return repository
                .findById(id)
                .orElse(null);

    }
    public List<Complaint> getByMobile(String mobile) {

        return repository
                .findByMobileNumber(mobile);

    }
}