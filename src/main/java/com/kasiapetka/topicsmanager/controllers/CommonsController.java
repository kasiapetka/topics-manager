package com.kasiapetka.topicsmanager.controllers;

import com.kasiapetka.topicsmanager.model.Section;
import com.kasiapetka.topicsmanager.services.SectionService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@PreAuthorize("hasAnyRole('Admin', 'Teacher', 'Student')")
@RestController
public class CommonsController {

    private SectionService sectionService;

    public CommonsController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    //GETs

    @GetMapping("/api/common/sections/{semester_number}")
    List<Section> listSectionsBySemester(@PathVariable Integer semester_number){
        return sectionService.listSectionBySemester(semester_number);
    }

    @GetMapping("/api/common/sections/section/{sectionID}")
    Section getSectionById(@PathVariable Long sectionID){
        return sectionService.findSectionById(sectionID);
    }

    //POSTs


    //PUTs
}
