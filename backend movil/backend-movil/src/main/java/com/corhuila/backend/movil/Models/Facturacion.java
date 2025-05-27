package com.corhuila.backend.movil.Models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "facturacion")
public class Facturacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identificador único para la entidad

    @Column(nullable = false)
    private String cliente;

    @Column(nullable = false)
    private String placa;

    @Column(nullable = false)
    private int horas;

    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false)
    private double total;

    @Column(nullable = false)
    private LocalDate fecha;  // Usar LocalDate para fechas sin tiempo

    // Constructor vacío para JPA
    public Facturacion() {}

    // Constructor con todos los parámetros
    public Facturacion(String cliente, String placa, int horas, String tipo, double total, LocalDate fecha) {
        this.cliente = cliente;
        this.placa = placa;
        this.horas = horas;
        this.tipo = tipo;
        this.total = total;
        this.fecha = fecha;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public int getHoras() {
        return horas;
    }

    public void setHoras(int horas) {
        this.horas = horas;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
}

