package opp.service;

import opp.domain.Trosak;

import java.util.List;

public interface TrosakService {
    Trosak saveForPutovanje(Trosak trosak, Long putovanjeId);
    Trosak update(Long trosakId, Trosak noviTrosak);
    void deleteById(Long trosakId);
    List<Trosak> findByPutovanjeId(Long putovanjeId);
    Double sumaZaPutovanje(Long putovanjeId);
}