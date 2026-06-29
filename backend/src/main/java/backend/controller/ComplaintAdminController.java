package backend.controller;

import backend.aws.DynamoComplaintService;
import org.springframework.web.bind.annotation.*;

import software.amazon.awssdk.services.dynamodb.model.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin/complaints")
@CrossOrigin(origins = "*")
public class ComplaintAdminController {

    private final DynamoComplaintService service;

    public ComplaintAdminController(DynamoComplaintService service) {
        this.service = service;
    }

    // 🔥 GET ALL COMPLAINTS (ADMIN DASHBOARD)
    @GetMapping
    public List<Map<String, AttributeValue>> getAllComplaints() {

        return service.getAllComplaints();
    }

    // 🔥 UPDATE STATUS
    @PutMapping("/{id}")
    public String updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {

        String status = body.get("status");

        service.updateStatus(id, status);

        return "Updated";
    }
}