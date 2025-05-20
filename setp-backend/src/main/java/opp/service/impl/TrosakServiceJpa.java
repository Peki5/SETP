package opp.service.impl;

import lombok.RequiredArgsConstructor;
import opp.dao.PutovanjeRepository;
import opp.dao.TrosakRepository;
import opp.domain.Putovanje;
import opp.domain.Trosak;
import opp.service.TrosakService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrosakServiceJpa implements TrosakService {

    private final TrosakRepository trosakRepository;
    private final PutovanjeRepository putovanjeRepository;

    @Override
    public Trosak saveForPutovanje(Trosak trosak, Long putovanjeId) {
        Putovanje putovanje = putovanjeRepository.findById(putovanjeId)
                .orElseThrow(() -> new RuntimeException("Putovanje ne postoji"));

        trosak.setPutovanje(putovanje);
        return trosakRepository.save(trosak);
    }

    @Override
    public Trosak update(Long trosakId, Trosak noviTrosak) {
        Trosak postojeći = trosakRepository.findById(trosakId)
                .orElseThrow(() -> new RuntimeException("Trošak ne postoji"));

        postojeći.setIznos(noviTrosak.getIznos());
        postojeći.setDatumTroska(noviTrosak.getDatumTroska());
        postojeći.setOpis(noviTrosak.getOpis());
        postojeći.setValuta(noviTrosak.getValuta());
        postojeći.setNacinPlacanja(noviTrosak.getNacinPlacanja());
        postojeći.setKategorijaTroska(noviTrosak.getKategorijaTroska());

        return trosakRepository.save(postojeći);
    }

    @Override
    public void deleteById(Long trosakId) {
        trosakRepository.deleteById(trosakId);
    }

    @Override
    public List<Trosak> findByPutovanjeId(Long putovanjeId) {
        return trosakRepository.findByPutovanje_PutovanjeId(putovanjeId);
    }

    @Override
    public Double sumaZaPutovanje(Long putovanjeId) {
        return trosakRepository.sumIznosByPutovanjeId(putovanjeId).orElse(0.0);
    }
}