package com.corhuila.backend.movil.Models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservas")
public class Reservas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tipo_vehiculo", nullable = false)
    private String tipoVehiculo;

    @Column(name = "vehiculo_personalizado")
    private String vehiculoPersonalizado;

    @Column(name = "placa", nullable = false)
    private String placa;

    @Column(name = "hora_entrada", nullable = false)
    private LocalDateTime horaEntrada = LocalDateTime.now(); // Valor predeterminado

    @Column(name = "hora_salida")
    private LocalDateTime horaSalida;

    // Constructor vacío requerido por JPA
    public Reservas() {
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoVehiculo() {
        return tipoVehiculo;
    }

    public void setTipoVehiculo(String tipoVehiculo) {
        this.tipoVehiculo = tipoVehiculo;
    }

    public String getVehiculoPersonalizado() {
        return vehiculoPersonalizado;
    }

    public void setVehiculoPersonalizado(String vehiculoPersonalizado) {
        this.vehiculoPersonalizado = vehiculoPersonalizado;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public LocalDateTime getHoraEntrada() {
        return horaEntrada;
    }

    public void setHoraEntrada(LocalDateTime horaEntrada) {
        this.horaEntrada = horaEntrada;
    }

    public LocalDateTime getHoraSalida() {
        return horaSalida;
    }

    public void setHoraSalida(LocalDateTime horaSalida) {
        this.horaSalida = horaSalida;
    }
}
