package opp.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Putovanje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long putovanjeId;

    private LocalDate datumPocetka;
    private LocalDate datumZavrsetka;
    private String svrha;
    private String opis;
    private Double sumaTroskova;

    @ManyToOne
    @JoinColumn(name = "kat_putovanja_id")
    private KategorijaPutovanja kategorijaPutovanja;

    @ManyToOne
    @JoinColumn(name = "lokacija_id")
    private Lokacija lokacija;
}