package backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @Column(columnDefinition = "TEXT")
    
    private String citizenName;

    private String mobileNumber;
    
    private String description;

    private String category;

    private String department;

    private String priority;

    private String status;

    private String locationName;

    private Boolean locationVerified;

    private Double latitude;

    private Double longitude;

    private LocalDateTime createdAt;
    
    private String district;
    
    private String imageUrl;

    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();

        if(status == null) {
            status = "Pending";
        }

        if(locationVerified == null) {
            locationVerified = false;
        }
    }
}