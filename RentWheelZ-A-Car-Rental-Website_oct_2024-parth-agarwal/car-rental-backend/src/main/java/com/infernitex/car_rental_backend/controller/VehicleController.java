package com.infernitex.car_rental_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infernitex.car_rental_backend.model.Vehicle;
import com.infernitex.car_rental_backend.service.UserService;
import com.infernitex.car_rental_backend.service.VehicleService;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private UserService userService;

    @GetMapping("hello")
    public String hello() {
        return "Hello from VehicleController";
    }

    @GetMapping("/all")
    public List<Vehicle> getAllVehicles(@RequestParam String token) {
        if(userService.validateJwtToken(token)) {
            return vehicleService.findAll();
        }
        return null;
    }

    @GetMapping("/vehicle")
    public Vehicle getVehicle(@RequestParam Long vehicleId, @RequestParam String token) {
        if(!userService.validateJwtToken(token)) {
            return null;
        }
        return vehicleService.findById(vehicleId);
    }

}
