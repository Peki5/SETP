package opp.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KategorijaTroska {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long kategorijaTroskaId;

    private String naziv;
    private String opis;
}