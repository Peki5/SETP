package opp;

import opp.dao.PutovanjeRepository;
import opp.domain.Putovanje;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PutovanjeIntegrationTest {

    @Autowired
    private PutovanjeRepository repository;

    @Test
    void testKreirajINadjiPutovanje() {
        Putovanje putovanje = Putovanje.builder()
                .svrha("Test")
                .build();

        Putovanje saved = repository.save(putovanje);
        assertNotNull(repository.findById(saved.getPutovanjeId()).orElse(null));
    }
}