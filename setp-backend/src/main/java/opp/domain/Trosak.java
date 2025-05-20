package opp.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trosak {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trosakId;

    private Double iznos;
    private LocalDate datumTroska;
    private String opis;

    @ManyToOne
    @JoinColumn(name = "valuta_id")
    private Valuta valuta;

    @ManyToOne
    @JoinColumn(name = "nacin_placanja_id")
    private NacinPlacanja nacinPlacanja;

    @ManyToOne
    @JoinColumn(name = "kategorija_troska_id")
    private KategorijaTroska kategorijaTroska;

    @ManyToOne
    @JoinColumn(name = "putovanje_id")
    private Putovanje putovanje;
}