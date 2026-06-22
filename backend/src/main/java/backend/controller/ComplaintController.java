package backend.controller;

import backend.entity.Complaint;
import backend.service.ComplaintService;
import org.springframework.web.bind.annotation.*;
import backend.ai.GroqService;


import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:3000")
public class ComplaintController {
	
	private final GroqService groqService;

    private final ComplaintService service;

    public ComplaintController(
            ComplaintService service,
            GroqService geminiService) {

        this.service = service;
        this.groqService = geminiService;
    }
    @PostMapping("/classify")
    public String classifyComplaint(
            @RequestBody String complaint) {

        return groqService.classifyComplaint(
                complaint);
    }
    
   

    @PostMapping
    public Complaint addComplaint(
            @RequestBody Complaint complaint) {

        return service.save(
                complaint);
    }
    
    @GetMapping("/{id}")
    public Complaint getComplaintById(
            @PathVariable Integer id) {

        return service.getComplaintById(id);

    }

    @GetMapping
    public List<Complaint> getAll() {

        return service.getAll();
    }
    @PutMapping("/{id}/{status}")
    public Complaint updateStatus(
            @PathVariable Integer id,
            @PathVariable String status) {

        return service.updateStatus(
                id,
                status);
    }
    @DeleteMapping("/{id}")
    public String deleteComplaint(
            @PathVariable Integer id) {

        service.deleteComplaint(id);

        return "Deleted";
    }
    
    
    @GetMapping("/mobile/{mobile}")
    public List<Complaint>
    getByMobile(
            @PathVariable String mobile){

        return service.getByMobile(
                mobile
        );
    }
    
}