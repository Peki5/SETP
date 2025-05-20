package opp.service;

import opp.domain.Putovanje;

import java.util.List;
import java.util.Optional;

public interface PutovanjeService {
    Putovanje save(Putovanje putovanje);
    List<Putovanje> findAll();
    Optional<Putovanje> findById(Long id);
    void deleteById(Long id);
}