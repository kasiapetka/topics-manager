package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Attachment;
import com.kasiapetka.topicsmanager.model.Section;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface AttachmentRepository extends CrudRepository<Attachment, String> {

    Optional<List<Attachment>> findAllBySection(Section section);
}
