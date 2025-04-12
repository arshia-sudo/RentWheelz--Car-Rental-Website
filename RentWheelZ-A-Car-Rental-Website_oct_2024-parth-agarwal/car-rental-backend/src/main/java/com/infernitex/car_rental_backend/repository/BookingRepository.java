package com.infernitex.car_rental_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infernitex.car_rental_backend.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Booking findById(long id);
    List<Booking> findByCustomerId(Long customerId);
    List<Booking> findByVehicleId(Long vehicleId);
}

