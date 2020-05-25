package com.kasiapetka.topicsmanager.model;

import com.kasiapetka.topicsmanager.DTO.AttachmentDTO;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

//@todo Stworzyc dwukierunkowe settery dla wszystkich dwukierunkowych relacji

@Data
@Table(name = "attachments")
@Entity
public class Attachment {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @NotNull
    private String fileName;

    @NotNull
    private String fileType;

    @Lob
    private byte[] data;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section section;

//    @NotNull
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    public AttachmentDTO convertToDTO(){
        AttachmentDTO attachmentDTO = new AttachmentDTO();

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/downloadFile/")
                .path(this.getId())
                .toUriString();

        attachmentDTO.setFileDownloadUri(fileDownloadUri);

        attachmentDTO.setFileType(this.fileType);
        attachmentDTO.setFileName(this.fileName);
        attachmentDTO.setSize(data.length);

        return attachmentDTO;
    }
}
