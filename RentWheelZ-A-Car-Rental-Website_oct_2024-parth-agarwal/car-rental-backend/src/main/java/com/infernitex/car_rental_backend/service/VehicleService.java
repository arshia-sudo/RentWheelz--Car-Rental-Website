package com.infernitex.car_rental_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infernitex.car_rental_backend.model.Vehicle;
import com.infernitex.car_rental_backend.repository.VehicleRepository;

@Service
public class VehicleService {
    
    @Autowired
    private VehicleRepository vehicleRepository;

    public Vehicle findById(long id) {
        return vehicleRepository.findById(id);
    }

    public List<Vehicle> findAll() {
        return vehicleRepository.findAll();
    }

    public void updateVehicleRating(long vehicleId, double rating) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId);
        vehicle.setRating(rating);
        vehicleRepository.save(vehicle);
    }
}
