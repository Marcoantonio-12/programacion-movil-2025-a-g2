package com.corhuila.backend.movil.Controllers;

import com.corhuila.backend.movil.Models.Usuario;
import com.corhuila.backend.movil.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Expresiones regulares para validación
    private final Pattern gmailPattern = Pattern.compile("^[a-zA-Z0-9._%+-]+@gmail\\.com$");
    private final Pattern phonePattern = Pattern.compile("^\\d{10}$");

    // Registro de usuario
    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            // Validación de campos obligatorios
            if (usuario.getNombre() == null || usuario.getEmail() == null || usuario.getPassword() == null ||
                    usuario.getTelefono() == null || usuario.getRol() == null ||
                    usuario.getNombre().isEmpty() || usuario.getEmail().isEmpty() || usuario.getPassword().isEmpty() ||
                    usuario.getTelefono().isEmpty() || usuario.getRol().isEmpty()) {
                return ResponseEntity.badRequest().body("Todos los campos son obligatorios.");
            }

            // Validación del correo
            if (!gmailPattern.matcher(usuario.getEmail()).matches()) {
                return ResponseEntity.badRequest().body("El correo debe ser un correo válido de Gmail.");
            }

            // Validación del teléfono
            if (!phonePattern.matcher(usuario.getTelefono()).matches()) {
                return ResponseEntity.badRequest().body("El número de teléfono debe tener 10 dígitos.");
            }

            // Registro
            authService.registro(usuario);

            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Usuario registrado exitosamente.");
            response.put("email", usuario.getEmail());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al registrar el usuario: " + e.getMessage());
        }
    }

    // Inicio de sesión
    @PostMapping("/login")
    public ResponseEntity<?> iniciarSesion(@RequestBody Usuario usuario) {
        try {
            if (usuario.getEmail() == null || usuario.getPassword() == null ||
                    usuario.getEmail().isEmpty() || usuario.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("El correo y la contraseña son obligatorios.");
            }

            String token = authService.login(usuario.getEmail(), usuario.getPassword());

            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Inicio de sesión exitoso.");
            response.put("email", usuario.getEmail());
            response.put("token", token);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el inicio de sesión: " + e.getMessage());
        }
    }

    // Recuperación de contraseña
    @PostMapping("/recuperar")
    public ResponseEntity<?> recuperarContrasena(@RequestBody Map<String, String> payload) {
        String correo = payload.get("correo");

        if (correo == null || correo.isEmpty()) {
            return ResponseEntity.badRequest().body("El correo es obligatorio.");
        }

        try {
            boolean enviado = authService.recuperarContrasena(correo);
            if (enviado) {
                return ResponseEntity.ok("Se ha enviado un correo de recuperación.");
            } else {
                return ResponseEntity.badRequest().body("El correo no está registrado.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al recuperar contraseña: " + e.getMessage());
        }
    }
}
