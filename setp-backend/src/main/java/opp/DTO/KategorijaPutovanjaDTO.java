package opp.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KategorijaPutovanjaDTO {
    private Long katPutovanjaId;
    private String naziv;
    private String opis;
}