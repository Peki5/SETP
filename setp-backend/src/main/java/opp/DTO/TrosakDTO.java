package opp.DTO;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrosakDTO {
    private Long trosakId;
    private Double iznos;
    private LocalDate datumTroska;
    private String opis;
    private Long valutaId;
    private Long nacinPlacanjaId;
    private Long kategorijaTroskaId;
    private Long putovanjeId;
}