// src/main/java/com/example/carrental/repository/UserRepository.java

package com.infernitex.car_rental_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infernitex.car_rental_backend.model.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    Vehicle findById(long id);
}
