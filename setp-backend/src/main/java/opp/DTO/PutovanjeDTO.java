package opp.DTO;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PutovanjeDTO {
    private Long putovanjeId;
    private LocalDate datumPocetka;
    private LocalDate datumZavrsetka;
    private String svrha;
    private String opis;
    private Double sumaTroskova;
    private Long kategorijaPutovanjaId;
    private Long lokacijaId;
}