package opp.controller;

import opp.domain.Putovanje;
import opp.domain.Trosak;
import opp.rest.PutovanjeController;
import opp.service.PutovanjeService;
import opp.service.TrosakService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PutovanjeControllerTest {

    @InjectMocks
    private PutovanjeController controller;

    @Mock
    private PutovanjeService putovanjeService;

    @Mock
    private TrosakService trosakService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testKreirajPutovanje() {
        Putovanje p = new Putovanje();
        when(putovanjeService.save(any())).thenReturn(p);

        ResponseEntity<Putovanje> response = controller.kreirajPutovanje(p);
        assertEquals(200, response.getStatusCodeValue());
        verify(putovanjeService).save(p);
    }

    @Test
    void testGetSvaPutovanja() {
        when(putovanjeService.findAll()).thenReturn(List.of(new Putovanje()));
        var response = controller.getSvaPutovanja();
        assertFalse(response.getBody().isEmpty());
    }

    @Test
    void testDodajTrosak() {
        Trosak t = new Trosak();
        when(trosakService.saveForPutovanje(any(), eq(1L))).thenReturn(t);
        var response = controller.dodajTrosak(1L, t);
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testSumaTroskova() {
        when(trosakService.sumaZaPutovanje(1L)).thenReturn(100.0);
        var response = controller.sumaTroskova(1L);
        assertEquals(100.0, response.getBody());
    }
}