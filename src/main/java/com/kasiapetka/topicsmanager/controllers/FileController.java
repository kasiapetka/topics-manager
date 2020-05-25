package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.DTO.AttachmentDTO;
import com.kasiapetka.topicsmanager.model.Attachment;
import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.services.AttachmentService;
import com.kasiapetka.topicsmanager.services.SectionService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.UserService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class FileController {

    private AttachmentService attachmentService;
    private StudentService studentService;
    private SectionService sectionService;
    private UserService userService;

    public FileController(AttachmentService attachmentService, StudentService studentService,
                          SectionService sectionService, UserService userService) {
        this.attachmentService = attachmentService;
        this.studentService = studentService;
        this.sectionService = sectionService;
        this.userService = userService;
    }

    @PostMapping("/api/uploadFile/{sectionID}")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                        @PathVariable Long sectionID) {

        Section section = sectionService.findSectionById(sectionID);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByEmail(auth.getName());
        Student student = studentService.findStudentByUser(user);

        Integer responseCode = attachmentService.storeFile(file, section, student);

//        return new UploadFileResponse(attachment.getFileName(), fileDownloadUri,
//                file.getContentType(), file.getSize());

        return ResponseEntity.status(responseCode).build();
    }

//    @PostMapping("/uploadMultipleFiles")
//    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
//        return Arrays.asList(files)
//                .stream()
//                .map(file -> uploadFile(file))
//                .collect(Collectors.toList());
//    }

    @GetMapping("/api/downloadFile/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
        // Load file from database
        Attachment attachment = attachmentService.getFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(attachment.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attachment.getFileName() + "\"")
                .body(new ByteArrayResource(attachment.getData()));
    }

    @GetMapping("/api/files/{sectionID}")
    public List<AttachmentDTO> listAttachments(@PathVariable Long sectionID){

        Section section = sectionService.findSectionById(sectionID);

        return attachmentService.getFilesForSection(section);
    }
}
