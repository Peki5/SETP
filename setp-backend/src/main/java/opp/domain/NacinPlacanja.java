package opp.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NacinPlacanja {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nacinPlacanjaId;

    private String naziv;
    private String opis;
}
