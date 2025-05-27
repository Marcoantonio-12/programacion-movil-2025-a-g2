package com.corhuila.backend.movil.Service;

import com.corhuila.backend.movil.Models.Usuario;
import com.corhuila.backend.movil.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Registrar usuario
    public void registro(Usuario usuario) throws Exception {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new Exception("El correo ya está registrado.");
        }

        String encryptedPassword = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(encryptedPassword);

        usuarioRepository.save(usuario);
    }

    public String login(String email, String password) {
        return email;
    }

    public boolean recuperarContrasena(String correo) {
        return false;
    }
}

