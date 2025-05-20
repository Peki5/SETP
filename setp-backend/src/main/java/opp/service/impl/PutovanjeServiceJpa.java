package opp.service.impl;

import lombok.RequiredArgsConstructor;
import opp.dao.PutovanjeRepository;
import opp.domain.Putovanje;
import opp.service.PutovanjeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PutovanjeServiceJpa implements PutovanjeService {

    private final PutovanjeRepository putovanjeRepository;

    @Override
    public Putovanje save(Putovanje putovanje) {
        return putovanjeRepository.save(putovanje);
    }

    @Override
    public List<Putovanje> findAll() {
        return putovanjeRepository.findAll();
    }

    @Override
    public Optional<Putovanje> findById(Long id) {
        return putovanjeRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        putovanjeRepository.deleteById(id);
    }
}