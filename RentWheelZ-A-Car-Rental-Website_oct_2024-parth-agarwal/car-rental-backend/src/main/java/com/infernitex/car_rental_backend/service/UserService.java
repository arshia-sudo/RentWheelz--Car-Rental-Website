package com.infernitex.car_rental_backend.service;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.infernitex.car_rental_backend.model.User;
import com.infernitex.car_rental_backend.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private final String secret = "your secret key is this i hope this is long enough for you, you silly little goose"; // Update with your actual secret key
    String jwtSecret = Base64.getEncoder().encodeToString(secret.getBytes(StandardCharsets.UTF_8));
    private final long jwtExpiration = 604800000; // 1 week in milliseconds

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return generateJwtToken(user); // Generate and return JWT token
        }
        return null; // Invalid login
    }

    private String generateJwtToken(User user) {
        long now = System.currentTimeMillis();
        Date expiryDate = new Date(now + jwtExpiration);

        JwtBuilder builder = Jwts.builder()
                .setSubject(user.getId().toString()) // Use user ID as subject
                .setIssuedAt(new Date(now))
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret);

        return builder.compact();
    }

    public User fetchUserById(Long id) {
        return userRepository.findById(id).orElse(null); // Fetch user by ID
    }

    public User fetchUserByEmail(String email) {
        return userRepository.findByEmail(email); // Fetch user by ID
    }

    public User updateUser(Long id, User updatedUser) {
        User existingUser = fetchUserById(id);
        if (existingUser != null) {
            if(!updatedUser.getFirstName().equals(""))existingUser.setFirstName(updatedUser.getFirstName());
            if(!updatedUser.getFirstName().equals(""))existingUser.setLastName(updatedUser.getLastName());
            if(!updatedUser.getFirstName().equals(""))existingUser.setAddress(updatedUser.getAddress());
            if(!updatedUser.getFirstName().equals(""))existingUser.setPhoneNo(updatedUser.getPhoneNo());
            return userRepository.save(existingUser); // Save updated user
        }
        return null; // User not found
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true; // User deleted successfully
        }
        return false; // User not found
    }

    public String generateResetToken(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return null;
        }
        logger.info("User found: {}", user.getFirstName());

        String resetToken = UUID.randomUUID().toString();

        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(3)); // Set expiry time (3 minutes from now)

        logger.info("Updating user with reset token and expiry: {}", user.getFirstName());
        userRepository.save(user);

        logger.info("User successfully saved with updated reset token and expiry: {}", user.getFirstName());

        return resetToken;
    }

    public boolean resetPassword(String resetToken, String newPassword) {
        User user = userRepository.findByResetToken(resetToken);
        if (user != null && user.getResetTokenExpiry().isAfter(LocalDateTime.now())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null);
            user.setResetTokenExpiry(null);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    // Validate the JWT token
    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder() // Use parserBuilder for newer versions of JJWT
                    .setSigningKey(jwtSecret) // Set the signing key used in token generation
                    .build() // Build the parser with the signing key
                    .parseClaimsJws(token); // Parse the token to check its validity
            return true; // Token is valid
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("JWT token is expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("JWT token is unsupported: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty: " + e.getMessage());
        }
        return false; // Token is invalid
    }

    // Extract claims from the token
    public Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
    }

    // Example: Fetch user ID from the token
    public String getUserIdFromJwtToken(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.getSubject();
    }
}
