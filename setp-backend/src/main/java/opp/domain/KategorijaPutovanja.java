package opp.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KategorijaPutovanja {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long katPutovanjaId;

    private String naziv;
    private String opis;
}