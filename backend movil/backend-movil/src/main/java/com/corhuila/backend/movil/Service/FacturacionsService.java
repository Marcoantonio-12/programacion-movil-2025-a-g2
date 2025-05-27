package com.corhuila.backend.movil.Service;

import com.corhuila.backend.movil.Models.Facturacion;
import com.corhuila.backend.movil.Repositories.FacturacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturacionsService {

    @Autowired
    private FacturacionRepository facturacionRepository;

    public Facturacion guardarFactura(Facturacion facturacion) {
        return facturacionRepository.save(facturacion);
    }

    public List<Facturacion> obtenerTodasLasFacturas() {
        return facturacionRepository.findAll();
    }

    public Facturacion obtenerFacturaPorId(Long id) {
        return facturacionRepository.findById(id).orElse(null);
    }

    public void eliminarFactura(Long id) {
        facturacionRepository.deleteById(id);
    }

    public Facturacion actualizarFactura(Long id, Facturacion nuevaFactura) {
        return facturacionRepository.findById(id).map(facturaExistente -> {
            facturaExistente.setCliente(nuevaFactura.getCliente());
            facturaExistente.setPlaca(nuevaFactura.getPlaca());
            facturaExistente.setHoras(nuevaFactura.getHoras());
            facturaExistente.setTipo(nuevaFactura.getTipo());
            facturaExistente.setTotal(nuevaFactura.getTotal());
            facturaExistente.setFecha(nuevaFactura.getFecha());
            return facturacionRepository.save(facturaExistente);
        }).orElse(null);
    }
}
