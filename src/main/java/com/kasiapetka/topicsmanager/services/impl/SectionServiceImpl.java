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
import java.util.ArrayList;
import java.util.List;

@Transactional
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
    public Long addNewSection(NewSection newSection) {
        Topic topic;
        Semester semester;
        List<Section> sectionList = new ArrayList<>();

        Character state;
        if(newSection.getState()){
            state = 'O';
        } else {
            state = 'C';
        }

        try {
            //todo rozkminic ten rok
            topic = topicService.findTopicById(newSection.getTopic());
            semester = semesterService.findSemesterBySemesterAndYear(newSection.getSemester(),
                    semesterService.getCurrentYear());

            sectionList = semester.getSections();
        } catch (HibernateException he){
            he.printStackTrace();
            return -1L;
        }

        for(Section semestersSections : sectionList){
            if(semestersSections.getName().equals(newSection.getName())){
                return -2L;
            }
        }

        try {
            Section section = new Section();
            section.setName(newSection.getName());
            section.setSizeOfSection(newSection.getSize());
            section.setState(state);
            section.setTopic(topic);
            section.setSemester(semester);

            sectionRepository.save(section);

            return section.getId();
        } catch (HibernateException he) {
            return -1L;
        }
    }

    @Override
    public Boolean addStudentsToSection(AddStudentsToSectionDTO addStudentsToSectionDTO) {
        try {
            Section section = findSectionById(addStudentsToSectionDTO.getSectionId());

            if (!section.getState().equals('O')) {
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

    @Override
    public List<Section> listSections() {
        List<Section> sectionList = new ArrayList<>();
        sectionRepository.findAll().iterator().forEachRemaining(sectionList::add);
        return sectionList;
    }

    @Override
    public List<Section> listSectionBySemester(Integer semester_number) {
//        List<Section> sectionList = this.listSections();
//        List<Section> sectionsFromThisSemester = new ArrayList<>();
//        for(Section section : sectionList){
//            System.out.println("section semester" + section.getSemester().getSemester() + "\t" + semester_number + "\n" +
//                                "section year" + section.getSemester().getYear() + "\t" + semesterService.getCurrentYear());
//            if(section.getSemester().getSemester() == semester_number &&
//                    section.getSemester().getYear() == semesterService.getCurrentYear()){
//                sectionsFromThisSemester.add(section);
//            }
//        }
//        return sectionsFromThisSemester;
        Semester semester = semesterService.findSemesterBySemesterAndYear(semester_number, semesterService.getCurrentYear());
        return semester.getSections();
    }

    @Override
    public Integer deleteSection(Long sectionID) {
        try {
            Section section = this.findSectionById(sectionID);
            section.setState('F');
            sectionRepository.save(section);
            return 200;
        } catch (HibernateException he){
            he.printStackTrace();
            return 500;
        }
    }
}
