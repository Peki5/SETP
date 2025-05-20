package opp.dao;

import opp.domain.Trosak;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TrosakRepository extends JpaRepository<Trosak, Long> {
    List<Trosak> findByPutovanje_PutovanjeId(Long putovanjeId);

    @Query("SELECT SUM(t.iznos) FROM Trosak t WHERE t.putovanje.putovanjeId = :putovanjeId")
    Optional<Double> sumIznosByPutovanjeId(@Param("putovanjeId") Long putovanjeId);
}