package opp.service.impl;

import lombok.RequiredArgsConstructor;
import opp.dao.ValutaRepository;
import opp.domain.Valuta;
import opp.service.ValutaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ValutaServiceJpa implements ValutaService {

    private final ValutaRepository valutaRepository;

    @Override
    public List<Valuta> findAll() {
        return valutaRepository.findAll();
    }

    @Override
    public Valuta findById(Long id) {
        return valutaRepository.findById(id).orElse(null);
    }

    @Override
    public Valuta save(Valuta valuta) {
        return valutaRepository.save(valuta);
    }

    @Override
    public void deleteById(Long id) {
        valutaRepository.deleteById(id);
    }
}