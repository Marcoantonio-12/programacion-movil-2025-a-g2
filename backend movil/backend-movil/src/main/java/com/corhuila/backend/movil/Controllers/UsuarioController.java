package com.corhuila.backend.movil.Controllers;

import com.corhuila.backend.movil.Models.Usuario;
import com.corhuila.backend.movil.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Obtener todos los usuarios
    @GetMapping
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    // Obtener un usuario por email (ID)
    @GetMapping("/{email}")
    public ResponseEntity<?> obtenerPorId(@PathVariable String email) {
        Optional<Usuario> usuario = usuarioRepository.findById(email);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
    }

    // Crear nuevo usuario (registro)
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Usuario usuario) {
        try {
            // Validar campos obligatorios
            if (usuario.getEmail() == null || usuario.getPassword() == null ||
                    usuario.getNombre().isEmpty() ||
                    usuario.getEmail().isEmpty() || usuario.getPassword().isEmpty() ||
                    usuario.getTelefono() == null || usuario.getTelefono().isEmpty() ||
                    usuario.getRol() == null || usuario.getRol().isEmpty()) {

                return ResponseEntity.badRequest().body("Todos los campos (nombre,correo, contraseña, teléfono, rol) son obligatorios.");
            }

            // Validar formato de correo
            if (!usuario.getEmail().matches("^[a-zA-Z0-9._%+-]+@gmail\\.com$")) {
                return ResponseEntity.badRequest().body("El correo debe ser un correo válido de Gmail.");
            }

            // Validar formato de teléfono
            if (!usuario.getTelefono().matches("^\\d{10}$")) {
                return ResponseEntity.badRequest().body("El número de teléfono debe tener 10 dígitos.");
            }

            // Verificar si ya existe un usuario con ese email
            if (usuarioRepository.existsByEmail(usuario.getEmail())) {
                return ResponseEntity.status(409).body("El correo ya está registrado.");
            }

            Usuario guardado = usuarioRepository.save(usuario);

            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Usuario registrado exitosamente.");
            response.put("usuario", guardado);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al registrar el usuario: " + e.getMessage());
        }
    }

    // Actualizar usuario por email
    @PutMapping("/{email}")
    public ResponseEntity<?> actualizar(@PathVariable String email, @RequestBody Usuario usuarioActualizado) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(email);

        if (!usuarioOptional.isPresent()) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }

        Usuario usuario = usuarioOptional.get();
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setPassword(usuarioActualizado.getPassword());
        usuario.setTelefono(usuarioActualizado.getTelefono());
        usuario.setRol(usuarioActualizado.getRol());

        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuario actualizado correctamente.");
    }

    // Eliminar usuario por email
    @DeleteMapping("/{email}")
    public ResponseEntity<?> eliminar(@PathVariable String email) {
        if (!usuarioRepository.existsById(email)) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
        usuarioRepository.deleteById(email);
        return ResponseEntity.ok("Usuario eliminado correctamente.");
    }
}
