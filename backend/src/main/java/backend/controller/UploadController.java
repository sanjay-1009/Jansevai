package backend.controller;

import backend.aws.S3Service;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:3000")
public class UploadController {

    private final S3Service s3Service;

    public UploadController(
            S3Service s3Service) {

        this.s3Service = s3Service;
    }

    @PostMapping
    public Map<String,String> uploadImage(
            @RequestParam("file")
            MultipartFile file)
            throws IOException {

        String imageUrl =
                s3Service.uploadFile(
                        file);

        return Map.of(
                "imageUrl",
                imageUrl);
    }
}