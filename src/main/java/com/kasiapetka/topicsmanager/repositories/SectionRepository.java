package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Section;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepository extends CrudRepository<Section, Long> {
    Section findByName(String name);
}
