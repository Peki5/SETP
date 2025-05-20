package opp.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LokacijaDTO {
    private Long lokacijaId;
    private String grad;
    private String drzava;
}