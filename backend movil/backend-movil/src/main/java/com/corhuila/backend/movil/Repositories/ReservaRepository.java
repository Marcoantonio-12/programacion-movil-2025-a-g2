package com.corhuila.backend.movil.Repositories;

import com.corhuila.backend.movil.Models.Reservas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaRepository extends JpaRepository<Reservas, Long> {
    // Consultas personalizadas opcionales
}
