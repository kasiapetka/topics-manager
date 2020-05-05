package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.DTO.AddStudentsToSectionDTO;
import com.kasiapetka.topicsmanager.DTO.NewSection;
import com.kasiapetka.topicsmanager.DTO.StudentPresenceDTO;
import com.kasiapetka.topicsmanager.DTO.StudentPresenceListDTO;
import com.kasiapetka.topicsmanager.model.*;
import com.kasiapetka.topicsmanager.repositories.PresenceRepository;
import com.kasiapetka.topicsmanager.repositories.SectionRepository;
import com.kasiapetka.topicsmanager.repositories.StudentRepository;
import com.kasiapetka.topicsmanager.repositories.StudentSectionRepository;
import com.kasiapetka.topicsmanager.services.*;
import org.hibernate.HibernateException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class SectionServiceImpl implements SectionService {
    private SectionRepository sectionRepository;
    private StudentRepository studentRepository;
    private StudentSectionRepository studentSectionRepository;
    private TeacherService teacherService;
    private PresenceRepository presenceRepository;

    private StudentService studentService;
    private TopicService topicService;
    private SemesterService semesterService;


    public SectionServiceImpl(SectionRepository sectionRepository, StudentRepository studentRepository,
                              StudentSectionRepository studentSectionRepository, TeacherService teacherService,
                              StudentService studentService, TopicService topicService, SemesterService semesterService,
                              PresenceRepository presenceRepository) {

        this.presenceRepository = presenceRepository;
        this.studentSectionRepository = studentSectionRepository;
        this.sectionRepository = sectionRepository;
        this.studentRepository = studentRepository;

        this.teacherService = teacherService;
        this.studentService = studentService;
        this.topicService = topicService;
        this.semesterService = semesterService;
    }

    @Override
    public Section findSectionById(Long id) {
        return sectionRepository.findById(id).orElse(new Section());
    }

    @Override
    public List<StudentSection> findStudentSectionsBySection(Section section) {
        List<StudentSection> studentSections = new ArrayList<>();
        studentSectionRepository.findAllBySection(section).orElse(new ArrayList<>()).iterator().forEachRemaining(studentSections::add);

        return studentSections;
    }

    //TODO refactor for returning responseCode and check if teacher is null and check if name is same for the same topic
    @Override
    public Long addNewSection(NewSection newSection) {
        Topic topic;
        Semester semester;
        List<Section> sectionList;
        Teacher teacher;

//        Character state;
//        if(newSection.getState()){
//            state = 'O';
//        } else {
//            state = 'C';
//        }


        try {
            //todo rozkminic ten rok
            topic = topicService.findTopicById(newSection.getTopic());
            semester = semesterService.findSemesterBySemesterAndYear(newSection.getSemester(),
                    semesterService.getCurrentYear());
            teacher = teacherService.findTeacherById(newSection.getTeacherId());

            sectionList = semester.getSections();
        } catch (HibernateException he) {
            he.printStackTrace();
            return -1L;
        }

        for (Section semestersSections : sectionList) {
            if (semestersSections.getName().equals(newSection.getName())) {
                return -2L;
            }
        }

        try {
            Section section = new Section();
            section.setName(newSection.getName());
            section.setSizeOfSection(newSection.getSize());
            section.setState(newSection.getState());
            section.setTopic(topic);
            section.setSemester(semester);
            section.setTeacher(teacher);

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

            if (!section.getState().equals('O') && !section.getState().equals('C')) {
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
    public List<Student> listStudentsBySectionId(Long sectionID) {
        Section section = this.findSectionById(sectionID);

        List<StudentSection> studentSections = this.findStudentSectionsBySection(section);

        List<Student> students = new ArrayList<>();

        studentSections.forEach((studentSection -> {
            students.add(studentSection.getStudent());
        }));

        return students;
    }

    @Override
    public Integer changeState(Long sectionId, Character state) {
        Section section = this.findSectionById(sectionId);

        if (section == null) {
            return 500;
        }
        section.setState(state);
        try {
            sectionRepository.save(section);
        } catch (HibernateException e) {
            e.printStackTrace();
            return 500;
        }

        return 200;
    }

    @Override
    public List<String> getDatesForSection(Long sectionID) {

        Section section = this.findSectionById(sectionID);
        List<StudentSection> studentSections = this.findStudentSectionsBySection(section);

        List<String> presenceDates = new ArrayList<>();

        studentSections.forEach(studentSection -> {
            List<Presence> presences = studentSection.getPresences();
            presences.forEach(presence -> {
                if(!presenceDates.contains(presence.getDate().toString())){
                    presenceDates.add(presence.getDate().toString());
                }
            });
        });

        return presenceDates;
    }

    @Override
    public Integer deleteSection(Long sectionID) {
        try {
            Section section = this.findSectionById(sectionID);
            section.setState('F');
            sectionRepository.save(section);
            return 200;
        } catch (HibernateException he) {
            he.printStackTrace();
            return 500;
        }
    }

    @Override
    public Integer issuePresence(Long sectionId, StudentPresenceListDTO studentPresenceListDTO) {

        Section section = this.findSectionById(sectionId);

//        List<Student> students = new ArrayList<>();
//        studentPresenceListDTO.getStudents().forEach(studentPresenceDTO ->
//            students.add(studentService.findStudentByAlbum(studentPresenceDTO.getAlbum()))
//        );

        List<StudentSection> studentSections = findStudentSectionsBySection(section);


        studentSections.forEach(studentSection -> {
            Student student = studentSection.getStudent();
            for(StudentPresenceDTO s : studentPresenceListDTO.getStudents()){
                if(s.getAlbum() == student.getAlbum()){
                    Presence presence = new Presence();
                    presence.setDate(studentPresenceListDTO.getDate());
                    presence.setIsPresent(s.getPresent());
                    presence.setStudentSection(studentSection);
                    try{
                        presenceRepository.save(presence);
                    } catch (HibernateException e){
                        e.printStackTrace();
                    }
                }
            }
        });

        return 200;
    }

    @Override
    public Integer editStudentsInSection(AddStudentsToSectionDTO studentsToSectionDTO) {

        List<StudentSection> studentSectionList = new ArrayList<>();

        for(Long album : studentsToSectionDTO.getStudentsAlbums()){
            StudentSection studentSection = new StudentSection();
            studentSection.setStudent(studentService.findStudentByAlbum(album));
            studentSection.setSection(this.findSectionById(studentsToSectionDTO.getSectionId()));

            studentSectionList.add(studentSection);
        }

        Section section = this.findSectionById(studentsToSectionDTO.getSectionId());

        List<StudentSection> studentSectionListToDelete = this.findStudentSectionsBySection(section);
        studentSectionRepository.deleteAll(studentSectionListToDelete);

        section.setStudentSections(studentSectionList);

        try {
            sectionRepository.save(section);
            return 200;
        } catch (HibernateException he){
            he.printStackTrace();
            return 500;
        }

    }

    @Override
    public Integer editSection(NewSection newSection, Long sectionID) {

        Section section = this.findSectionById(sectionID);
        if(section.getName().length() < 1){
            //section with given ID does not exist
            return 409;
        }

        section.setSizeOfSection(newSection.getSize());
        section.setState(newSection.getState());
        section.setName(newSection.getName());

        try {
            sectionRepository.save(section);
            return 200;
        } catch (HibernateException he){
            he.printStackTrace();
            return 500;
        }
    }
}
