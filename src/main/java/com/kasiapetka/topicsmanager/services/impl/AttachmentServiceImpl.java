package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.DTO.AttachmentDTO;
import com.kasiapetka.topicsmanager.model.Attachment;
import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.model.Student;
import com.kasiapetka.topicsmanager.model.User;
import com.kasiapetka.topicsmanager.repositories.AttachmentRepository;
import com.kasiapetka.topicsmanager.services.AttachmentService;
import com.kasiapetka.topicsmanager.services.SectionService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.UserService;
import org.hibernate.HibernateException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AttachmentServiceImpl implements AttachmentService {

    private AttachmentRepository attachmentRepository;
    private UserService userService;
    private StudentService studentService;
    private SectionService sectionService;

    public AttachmentServiceImpl(AttachmentRepository attachmentRepository, UserService userService,
                                 StudentService studentService, SectionService sectionService) {
        this.attachmentRepository = attachmentRepository;
        this.userService = userService;
        this.studentService = studentService;
        this.sectionService = sectionService;
    }

    @Override
    public Attachment getFile(String fileId) {
        return attachmentRepository.findById(fileId).orElse(new Attachment());
    }


    @Override
    public Integer storeFile(MultipartFile file, Section section, Student student) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                return 409;
//                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

//            Attachment attachment = new Attachment(fileName, file.getContentType(), file.getBytes());
            Attachment attachment = new Attachment();
            attachment.setFileName(fileName);
            attachment.setFileType(file.getContentType());
            attachment.setData(file.getBytes());


            attachment.setSection(section);
            attachment.setStudent(student);

            attachmentRepository.save(attachment);

            return 200;
        } catch (IOException ex) {
//            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
            return 500;
        }
    }

    @Override
    public List<AttachmentDTO> getFilesForSection(Section section) {

        List<Attachment> attachments = new ArrayList<>();
        attachmentRepository.findAllBySection(section).orElse(new ArrayList<>()).iterator().forEachRemaining(attachments::add);

        List<AttachmentDTO> attachmentDTOS = new ArrayList<>();

        for(Attachment attachment : attachments){
            attachmentDTOS.add(attachment.convertToDTO());
        }

        return attachmentDTOS;
    }

    @Override
    public Integer deleteFile(String fileId) {

        Attachment toDelete = this.getFile(fileId);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByEmail(auth.getName());

        if(user == null){
            return 500;
        }

        Student student = studentService.findStudentByUser(user);

        if(!student.equals(toDelete.getStudent())){
            return 409;
        }

        try{
            attachmentRepository.delete(toDelete);
        } catch (HibernateException e){
            e.printStackTrace();
            return 500;
        }

        return 200;
    }
}
