package opp.rest;

import opp.DTO.PutovanjeDTO;
import opp.DTO.TrosakDTO;
import opp.domain.Putovanje;
import opp.domain.Trosak;
import opp.service.PutovanjeService;
import opp.service.TrosakService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/putovanja")
@RequiredArgsConstructor
public class PutovanjeController {

    private final PutovanjeService putovanjeService;
    private final TrosakService trosakService;

    // [1] Unos pojedinog putovanja
    @PostMapping
    public ResponseEntity<Putovanje> kreirajPutovanje(@RequestBody Putovanje putovanje) {
        return ResponseEntity.ok(putovanjeService.save(putovanje));
    }

    // [2] Pregled svih putovanja
    @GetMapping
    public ResponseEntity<List<Putovanje>> getSvaPutovanja() {
        return ResponseEntity.ok(putovanjeService.findAll());
    }

    // [3] Pregled troškova pojedinog putovanja
    @GetMapping("/{putovanjeId}/troskovi")
    public ResponseEntity<List<Trosak>> getTroskoviZaPutovanje(@PathVariable Long putovanjeId) {
        return ResponseEntity.ok(trosakService.findByPutovanjeId(putovanjeId));
    }

    // [4] Dodavanje troška unutar putovanja
    @PostMapping("/{putovanjeId}/troskovi")
    public ResponseEntity<Trosak> dodajTrosak(@PathVariable Long putovanjeId, @RequestBody Trosak trosak) {
        return ResponseEntity.ok(trosakService.saveForPutovanje(trosak, putovanjeId));
    }

    // [5] Uređivanje troška
    @PutMapping("/troskovi/{trosakId}")
    public ResponseEntity<Trosak> urediTrosak(@PathVariable Long trosakId, @RequestBody Trosak noviTrosak) {
        return ResponseEntity.ok(trosakService.update(trosakId, noviTrosak));
    }

    // [6] Brisanje troška
    @DeleteMapping("/troskovi/{trosakId}")
    public ResponseEntity<Void> obrisiTrosak(@PathVariable Long trosakId) {
        trosakService.deleteById(trosakId);
        return ResponseEntity.noContent().build();
    }

    // [7] Suma ukupne potrošnje pojedinog putovanja
    @GetMapping("/{putovanjeId}/suma")
    public ResponseEntity<Double> sumaTroskova(@PathVariable Long putovanjeId) {
        return ResponseEntity.ok(trosakService.sumaZaPutovanje(putovanjeId));
    }
}

