// src/main/java/com/example/carrental/repository/UserRepository.java

package com.infernitex.car_rental_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infernitex.car_rental_backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByResetToken(String resetToken);
    User findById(long id);
}
