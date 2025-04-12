package com.infernitex.car_rental_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infernitex.car_rental_backend.model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Review findById(long id);
    List<Review> findByVehicleId(long id);
    Optional<Review> findByCustomerIdAndVehicleId(Long customerId, Long vehicleId);
}
