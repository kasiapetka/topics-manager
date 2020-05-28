package com.kasiapetka.topicsmanager.services;

import com.kasiapetka.topicsmanager.DTO.AttachmentDTO;
import com.kasiapetka.topicsmanager.model.Attachment;
import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AttachmentService {

    Integer storeFile(MultipartFile file, Section section, Student student);
    Attachment getFile(String fileId);
    List<AttachmentDTO> getFilesForSection(Section section);
    Integer deleteFile(String fileId);
}
