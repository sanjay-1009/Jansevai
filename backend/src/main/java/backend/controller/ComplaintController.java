package backend.controller;

import backend.entity.Complaint;
import backend.aws.DynamoComplaintService;
import backend.ai.GroqService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:3000")
public class ComplaintController {

    private final GroqService groqService;
    private final DynamoComplaintService dynamoService;

    public ComplaintController(
            GroqService groqService,
            DynamoComplaintService dynamoService) {

        this.groqService = groqService;
        this.dynamoService = dynamoService;
    }

    @PostMapping("/classify")
    public String classifyComplaint(@RequestBody String complaint) {
        return groqService.classifyComplaint(complaint);
    }

    @PostMapping
    public Map<String, String> addComplaint(@RequestBody Complaint complaint) {

        String id = dynamoService.saveComplaint(complaint);

        return Map.of(
                "message", "Saved to DynamoDB",
                "complaintId", id
        );
    }

    @GetMapping
    public List<Map<String, String>> getAll() {
        return dynamoService.getAllComplaints();
    }

    @PutMapping("/{id}/{status}")
    public String updateStatus(
            @PathVariable String id,
            @PathVariable String status) {

        dynamoService.updateStatus(id, status);
        return "Updated";
    }
    @GetMapping("/mobile/{mobile}")
    public List<Map<String, String>> getByMobile(@PathVariable String mobile) {
        return dynamoService.getComplaintsByMobile(mobile);
    }
    @GetMapping("/{id}")
    public Map<String, String> getById(@PathVariable String id) {
        return dynamoService.getComplaintById(id);
    }
    @DeleteMapping("/{id}")
    public String deleteComplaint(@PathVariable String id) {

        dynamoService.deleteComplaint(id);

        return "Deleted";
    }
}