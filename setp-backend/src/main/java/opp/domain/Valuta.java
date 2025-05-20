package opp.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Valuta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long valutaId;

    private String naziv;
    private String oznaka;
}