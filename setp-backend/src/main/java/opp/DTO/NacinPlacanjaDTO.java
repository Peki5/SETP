package opp.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NacinPlacanjaDTO {
    private Long nacinPlacanjaId;
    private String naziv;
    private String opis;
}