package com.kasiapetka.topicsmanager.repositories;

import com.kasiapetka.topicsmanager.model.Section;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;


public interface SectionRepository extends CrudRepository<Section, Long> {
}
