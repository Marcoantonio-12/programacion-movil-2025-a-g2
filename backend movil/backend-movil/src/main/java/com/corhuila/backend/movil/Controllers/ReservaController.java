package com.corhuila.backend.movil.Controllers;

import com.corhuila.backend.movil.Models.Reservas;
import com.corhuila.backend.movil.Service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:8100") // Permite peticiones desde tu app Ionic
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    /**
     * Crear una reserva asociada a un usuario.
     * Endpoint llamado desde el frontend: /api/reservas/crear/{usuarioId}
     *
     * @param usuarioId ID del usuario (desde la URL)
     * @param reserva Datos de la reserva (desde el cuerpo de la solicitud)
     * @return Reserva creada
     */
    @PostMapping("/crear/{usuarioId}")
    public ResponseEntity<Reservas> crearReserva(@PathVariable Long usuarioId, @RequestBody Reservas reserva) {
        // Validar que los campos obligatorios no sean nulos
        if (reserva.getTipoVehiculo() == null || reserva.getPlaca() == null) {
            return ResponseEntity.badRequest().build(); // Retorna un error 400 si faltan campos obligatorios
        }

        // Establecer hora de entrada si no se proporciona
        if (reserva.getHoraEntrada() == null) {
            reserva.setHoraEntrada(LocalDateTime.now());
        }

        // Guardar la reserva
        return ResponseEntity.ok(reservaService.guardarReserva(reserva));
    }
}
