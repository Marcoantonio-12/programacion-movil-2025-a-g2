package com.corhuila.backend.movil.Service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void enviarCorreo(String to, String subject, String body) {
        // Simulación de envío de correo
        System.out.println("=== Simulando envío de correo ===");
        System.out.println("Para: " + to);
        System.out.println("Asunto: " + subject);
        System.out.println("Mensaje:\n" + body);
        System.out.println("=================================");
    }
}
