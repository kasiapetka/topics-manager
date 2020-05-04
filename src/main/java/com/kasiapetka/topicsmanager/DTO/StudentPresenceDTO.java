package com.kasiapetka.topicsmanager.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentPresenceDTO {

    private Long album;
    private Boolean present;
}
