package com.corhuila.backend.movil.Controllers;

import com.corhuila.backend.movil.Models.Facturacion;
import com.corhuila.backend.movil.Service.FacturacionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facturacion")
@CrossOrigin(origins = "*")
public class FacturacionController {

    @Autowired
    private FacturacionsService facturacionService;

    @PostMapping
    public Facturacion guardar(@RequestBody Facturacion facturacion) {
        return facturacionService.guardarFactura(facturacion);
    }

    @GetMapping
    public List<Facturacion> obtenerTodas() {
        return facturacionService.obtenerTodasLasFacturas();
    }

    @GetMapping("/{id}")
    public Facturacion obtenerPorId(@PathVariable Long id) {
        return facturacionService.obtenerFacturaPorId(id);
    }

    @PutMapping("/{id}")
    public Facturacion actualizar(@PathVariable Long id, @RequestBody Facturacion facturacion) {
        return facturacionService.actualizarFactura(id, facturacion);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        facturacionService.eliminarFactura(id);
    }
}
