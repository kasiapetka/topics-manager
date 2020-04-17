package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Attachment;
import org.springframework.data.repository.CrudRepository;

public interface AttachmentRepository extends CrudRepository<Attachment, Long> {
}
