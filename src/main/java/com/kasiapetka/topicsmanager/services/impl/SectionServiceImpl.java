package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.model.*;
import com.kasiapetka.topicsmanager.parsingClasses.NewSection;
import com.kasiapetka.topicsmanager.repositories.SectionRepository;
import com.kasiapetka.topicsmanager.repositories.SemesterRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.TopicRepository;
import com.kasiapetka.topicsmanager.services.SectionService;
import com.kasiapetka.topicsmanager.services.SemesterService;
import com.kasiapetka.topicsmanager.services.StudentService;
import com.kasiapetka.topicsmanager.services.TopicService;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


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
                              StudentService studentService){
        this.sectionRepository = sectionRepository;
        this.studentRepository = studentRepository;

        this.semesterService = semesterService;
        this.studentService = studentService;
        this.topicService = topicService;
    }

    @Override
    public Section findSectionById(Long id) {
        Optional<Section> optionalSection = sectionRepository.findById(id);
        if(!optionalSection.isPresent()){
            return null;
        }
        return optionalSection.get();
    }

    @Override
    @Transactional
    public Boolean addNewSection(NewSection newSection) {
        try{
            Section section = new Section();
            section.setName(newSection.getName());
            section.setSizeOfSection(newSection.getSize());
            section.setIsOpen(newSection.getIsOpen());

            Topic topic = topicService.findTopicById(newSection.getTopicId());
            Semester semester = semesterService.findSemesterBySemester(newSection.getSemester());
            section.setTopic(topic);
            section.setSemester(semester);

            sectionRepository.save(section);
            return true;
        } catch (HibernateException he){
            return false;
        }
    }

    @Override
    @Transactional
    public Boolean addStudentToSection(Long studentAlbum, Long sectionId) {

        try{
            Student student = studentService.findStudentByAlbum(studentAlbum);
            Section section = findSectionById(sectionId);

            if(!section.getIsOpen()){
                return false;
            }

            StudentSection studentSection = new StudentSection();
            studentSection.setStudent(student);
            studentSection.setSection(section);

            section.addStudentSection(studentSection);

            sectionRepository.save(section);
            return true;
        } catch (HibernateException he){
            he.printStackTrace();
            return false;
        }
    }
}
