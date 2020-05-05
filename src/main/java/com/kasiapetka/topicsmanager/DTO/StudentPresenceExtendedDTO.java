package com.kasiapetka.topicsmanager.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentPresenceExtendedDTO {

    private Long album;
    private String name;
    private String surname;
    private Boolean presence;
}
