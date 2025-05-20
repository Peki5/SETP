package opp.dao;

import opp.domain.Putovanje;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PutovanjeRepository extends JpaRepository<Putovanje, Long> {}
