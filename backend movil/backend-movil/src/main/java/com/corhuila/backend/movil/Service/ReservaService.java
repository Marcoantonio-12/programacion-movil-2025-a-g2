package com.corhuila.backend.movil.Service;

import com.corhuila.backend.movil.Models.Reservas;
import com.corhuila.backend.movil.Repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    // Guardar una reserva
    public Reservas guardarReserva(Reservas reserva) {
        return reservaRepository.save(reserva);
    }

    // Obtener todas las reservas
    public List<Reservas> obtenerTodas() {
        return reservaRepository.findAll();
    }

    // Obtener por ID
    public Reservas obtenerPorId(Long id) {
        return reservaRepository.findById(id).orElse(null);
    }

    // Eliminar por ID
    public void eliminarReserva(Long id) {
        reservaRepository.deleteById(id);
    }
}
