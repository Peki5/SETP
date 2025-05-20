package opp.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KategorijaTroskaDTO {
    private Long kategorijaTroskaId;
    private String naziv;
    private String opis;
}