package opp.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ValutaDTO {
    private Long valutaId;
    private String naziv;
    private String oznaka;
}