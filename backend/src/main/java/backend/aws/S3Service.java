package backend.aws;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    private final S3Client s3Client;

    private final String bucketName =
            "jansevai-images";

    public S3Service(
            S3Client s3Client) {

        this.s3Client = s3Client;
    }

    public String uploadFile(
            MultipartFile file)
            throws IOException {

        String fileName =
                UUID.randomUUID()
                        + "-"
                        + file.getOriginalFilename();

        File tempFile =
                File.createTempFile(
                        "upload",
                        file.getOriginalFilename());

        file.transferTo(tempFile);

        PutObjectRequest request =
                PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(fileName)
                        .contentType(
                                file.getContentType())
                        .build();

        s3Client.putObject(
                request,
                tempFile.toPath());

        tempFile.delete();

        return "https://"
                + bucketName
                + ".s3.ap-south-1.amazonaws.com/"
                + fileName;
    }
}