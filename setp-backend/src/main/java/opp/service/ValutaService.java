package opp.service;

import opp.domain.Valuta;

import java.util.List;

public interface ValutaService {
    List<Valuta> findAll();
    Valuta findById(Long id);
    Valuta save(Valuta valuta);
    void deleteById(Long id);
}