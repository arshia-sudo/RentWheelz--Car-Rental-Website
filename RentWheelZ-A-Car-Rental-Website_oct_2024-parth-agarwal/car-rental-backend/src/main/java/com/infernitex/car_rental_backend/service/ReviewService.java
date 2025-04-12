package com.infernitex.car_rental_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infernitex.car_rental_backend.model.Review;
import com.infernitex.car_rental_backend.repository.ReviewRepository;

@Service
public class ReviewService {
    
  @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    public Review saveOrUpdateReview(Review review) {        
        Optional<Review> existingReview = reviewRepository.findByCustomerIdAndVehicleId(review.getCustomerId(), review.getVehicleId());
        if (existingReview.isPresent()) {
            Review updateReview = existingReview.get();
            updateReview.setRating(review.getRating());
            updateReview.setComment(review.getComment());
            return reviewRepository.save(updateReview);
        } else {
            return reviewRepository.save(review);
        }
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public List<Review> getReviewsByVehicleId(Long vehicleId) {
        return reviewRepository.findByVehicleId(vehicleId);
    }
}
