package backend.aws;

import backend.entity.Complaint;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.util.*;

@Service
public class DynamoComplaintService {

    private final DynamoDbClient dynamoDbClient;

    public DynamoComplaintService(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    // =========================
    // SAVE COMPLAINT
    // =========================
    public String saveComplaint(Complaint complaint) {

        Map<String, AttributeValue> item = new HashMap<>();

        // ✅ ALWAYS generate new ID (DO NOT depend on frontend/entity)
        String id = UUID.randomUUID().toString();

        item.put("complaintId", AttributeValue.builder()
                .s(id)
                .build());

        putIfNotNull(item, "title", complaint.getTitle());
        putIfNotNull(item, "citizenName", complaint.getCitizenName());
        putIfNotNull(item, "mobileNumber", complaint.getMobileNumber());
        putIfNotNull(item, "description", complaint.getDescription());
        putIfNotNull(item, "category", complaint.getCategory());
        putIfNotNull(item, "department", complaint.getDepartment());
        putIfNotNull(item, "priority", complaint.getPriority());

        // ✅ default status if null
        item.put("status", AttributeValue.builder()
                .s(complaint.getStatus() != null ? complaint.getStatus() : "PENDING")
                .build());

        putIfNotNull(item, "locationName", complaint.getLocationName());
        putIfNotNull(item, "district", complaint.getDistrict());
        putIfNotNull(item, "imageUrl", complaint.getImageUrl());
        
        item.put(
        	    "locationVerified",
        	    AttributeValue.builder()
        	        .bool(complaint.isLocationVerified())
        	        .build()
        	);

        dynamoDbClient.putItem(PutItemRequest.builder()
                .tableName("Complaints")
                .item(item)
                .build());
        
       

        // ✅ RETURN ID (IMPORTANT for frontend)
        return id;
        
     // Store location verification
       
    }

    // =========================
    // SAFE PUT HELPER
    // =========================
    private void putIfNotNull(Map<String, AttributeValue> item, String key, String value) {
        if (value != null && !value.trim().isEmpty()) {
            item.put(key, AttributeValue.builder().s(value).build());
        }
    }

    // =========================
    // GET ALL COMPLAINTS
    // =========================
    public List<Map<String, String>> getAllComplaints() {

        ScanRequest request = ScanRequest.builder()
                .tableName("Complaints")
                .build();

        ScanResponse response = dynamoDbClient.scan(request);

        List<Map<String, String>> result = new ArrayList<>();

        for (Map<String, AttributeValue> item : response.items()) {

            Map<String, String> clean = new HashMap<>();

            item.forEach((k, v) -> {

                if (v.s() != null) {
                    clean.put(k, v.s());
                }

                else if (v.n() != null) {
                    clean.put(k, v.n());
                }

                else {
                    try {
                        clean.put(k, String.valueOf(v.bool()));
                    } catch (Exception e) {
                        // ignore
                    }
                }

            });

            result.add(clean);
        }

        return result;
    }

    // =========================
    // UPDATE STATUS
    // =========================
    public void updateStatus(String complaintId, String status) {

        Map<String, AttributeValue> key = new HashMap<>();
        key.put("complaintId", AttributeValue.builder().s(complaintId).build());

        Map<String, AttributeValueUpdate> updates = new HashMap<>();

        updates.put("status",
                AttributeValueUpdate.builder()
                        .value(AttributeValue.builder().s(status).build())
                        .action(AttributeAction.PUT)
                        .build());

        dynamoDbClient.updateItem(UpdateItemRequest.builder()
                .tableName("Complaints")
                .key(key)
                .attributeUpdates(updates)
                .build());
    }
    public List<Map<String, String>> getComplaintsByMobile(String mobile) {

        ScanRequest request = ScanRequest.builder()
                .tableName("Complaints")
                .build();

        ScanResponse response = dynamoDbClient.scan(request);

        List<Map<String, String>> result = new ArrayList<>();

        for (Map<String, AttributeValue> item : response.items()) {

            String storedMobile = item.get("mobileNumber") != null
                    ? item.get("mobileNumber").s()
                    : "";

            if (storedMobile.equals(mobile)) {

                Map<String, String> clean = new HashMap<>();

                item.forEach((k, v) -> {
                    if (v.s() != null) clean.put(k, v.s());
                    else if (v.n() != null) clean.put(k, v.n());
                });

                result.add(clean);
            }
        }

        return result;
    }
    public Map<String, String> getComplaintById(String complaintId) {

        Map<String, AttributeValue> key = new HashMap<>();

        key.put(
                "complaintId",
                AttributeValue.builder()
                        .s(complaintId)
                        .build()
        );

        GetItemRequest request = GetItemRequest.builder()
                .tableName("Complaints")
                .key(key)
                .build();

        GetItemResponse response = dynamoDbClient.getItem(request);

        if (!response.hasItem()) {
            return null;
        }

        Map<String, String> clean = new HashMap<>();

        response.item().forEach((k, v) -> {
            if (v.s() != null)
                clean.put(k, v.s());
            else if (v.n() != null)
                clean.put(k, v.n());
        });

        return clean;
    }
    public void deleteComplaint(String complaintId) {

        Map<String, AttributeValue> key = new HashMap<>();

        key.put(
                "complaintId",
                AttributeValue.builder()
                        .s(complaintId)
                        .build()
        );

        DeleteItemRequest request =
                DeleteItemRequest.builder()
                        .tableName("Complaints")
                        .key(key)
                        .build();

        dynamoDbClient.deleteItem(request);
    }
}