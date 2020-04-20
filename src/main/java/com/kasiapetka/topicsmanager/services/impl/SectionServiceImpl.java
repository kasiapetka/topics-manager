package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.DTO.AddStudentsToSectionDTO;
import com.kasiapetka.topicsmanager.model.*;
import com.kasiapetka.topicsmanager.DTO.NewSection;
import com.kasiapetka.topicsmanager.repositories.SectionRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.services.SectionService;
import com.kasiapetka.topicsmanager.services.SemesterService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.TopicService;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;


@Service
public class SectionServiceImpl implements SectionService {
    private SectionRepository sectionRepository;
    private StudentRepository studentRepository;

    private StudentService studentService;
    private TopicService topicService;
    private SemesterService semesterService;

    @Autowired
    public SectionServiceImpl(SectionRepository sectionRepository, StudentRepository studentRepository,
                              TopicService topicService, SemesterService semesterService,
                              StudentService studentService) {
        this.sectionRepository = sectionRepository;
        this.studentRepository = studentRepository;

        this.semesterService = semesterService;
        this.studentService = studentService;
        this.topicService = topicService;
    }

    @Override
    public Section findSectionById(Long id) {
        return sectionRepository.findById(id).orElse(null);
    }

    //TODO dodac sprawdzanie czy identyczna sekcja z taka sama nazwa juz istnieje
    @Override
    //@Transactional
    public Long addNewSection(NewSection newSection) {
        try {
            Section section = new Section();
            section.setName(newSection.getName());
            section.setSizeOfSection(newSection.getSize());
            section.setIsOpen(newSection.getState());

            Topic topic = topicService.findTopicById(newSection.getTopic());

            //todo rozkminic ten rok
            Semester semester = semesterService.findSemesterBySemesterAndYear(newSection.getSemester(),
                    Integer.valueOf(LocalDate.now().toString().split("-")[0]));
            section.setTopic(topic);
            section.setSemester(semester);

            sectionRepository.save(section);

            return section.getId();
        } catch (HibernateException he) {
            return -1L;
        }
    }

    @Override
    @Transactional
    public Boolean addStudentsToSection(AddStudentsToSectionDTO addStudentsToSectionDTO) {
        try {
            Section section = findSectionById(addStudentsToSectionDTO.getSectionId());

            if (!section.getIsOpen()) {
                return false;
            }

            for (Long album : addStudentsToSectionDTO.getStudentsAlbums()) {
                Student student = studentService.findStudentByAlbum(album);

                StudentSection studentSection = new StudentSection();
                studentSection.setStudent(student);
                studentSection.setSection(section);

                section.addStudentSection(studentSection);

                sectionRepository.save(section);
            }

        } catch (HibernateException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}
