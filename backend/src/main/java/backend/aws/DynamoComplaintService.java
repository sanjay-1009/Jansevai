package backend.aws;

import backend.entity.Complaint;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.util.HashMap;
import java.util.Map;

@Service
public class DynamoComplaintService {

    private final DynamoDbClient dynamoDbClient;

    public DynamoComplaintService(
            DynamoDbClient dynamoDbClient) {

        this.dynamoDbClient = dynamoDbClient;
    }

    public void saveComplaint(
            Complaint complaint) {

        Map<String, AttributeValue> item =
                new HashMap<>();

        item.put(
                "complaintId",
                AttributeValue.builder()
                        .s(String.valueOf(
                                complaint.getId()))
                        .build());

        item.put(
                "title",
                AttributeValue.builder()
                        .s(complaint.getTitle())
                        .build());

        item.put(
                "citizenName",
                AttributeValue.builder()
                        .s(complaint.getCitizenName())
                        .build());

        item.put(
                "mobileNumber",
                AttributeValue.builder()
                        .s(complaint.getMobileNumber())
                        .build());

        item.put(
                "description",
                AttributeValue.builder()
                        .s(complaint.getDescription())
                        .build());

        item.put(
                "category",
                AttributeValue.builder()
                        .s(complaint.getCategory())
                        .build());

        item.put(
                "department",
                AttributeValue.builder()
                        .s(complaint.getDepartment())
                        .build());

        item.put(
                "priority",
                AttributeValue.builder()
                        .s(complaint.getPriority())
                        .build());

        item.put(
                "status",
                AttributeValue.builder()
                        .s(complaint.getStatus())
                        .build());
        
        item.put(
                "locationName",
                AttributeValue.builder()
                        .s(
                            complaint.getLocationName() == null
                            ? ""
                            : complaint.getLocationName())
                        .build());

        item.put(
                "district",
                AttributeValue.builder()
                        .s(
                            complaint.getDistrict() == null
                            ? ""
                            : complaint.getDistrict())
                        .build());

        item.put(
                "imageUrl",
                AttributeValue.builder()
                        .s(
                            complaint.getImageUrl() == null
                            ? ""
                            : complaint.getImageUrl())
                        .build());

        PutItemRequest request =
                PutItemRequest.builder()
                        .tableName("Complaints")
                        .item(item)
                        .build();

        dynamoDbClient.putItem(request);
    }
}