package com.corhuila.backend.movil.Repositories;

import com.corhuila.backend.movil.Models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    boolean existsByEmail(String email);
}
