package com.infernitex.car_rental_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infernitex.car_rental_backend.model.User;
import com.infernitex.car_rental_backend.service.EmailService;
import com.infernitex.car_rental_backend.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/hello")
    public String sendHello() {
        return "Hello World!";
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        User newUser = userService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Pair<String, Long>> login(@RequestBody User user) {
        String jwtToken = userService.loginUser(user.getEmail(), user.getPassword());
        User u = userService.fetchUserByEmail(user.getEmail());
        if (jwtToken != null && u.getId() != null) {
            Pair<String, Long> response = Pair.of(jwtToken, u.getId());
            return ResponseEntity.ok(response); // Return both token and user ID in response
        } else if (u.getId() == null) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(401).build();
    }

    @PostMapping("/forgotpass")
    public ResponseEntity<String> forgotPassword(@RequestBody User user) {
        String resetToken = userService.generateResetToken(user.getEmail());
        if (resetToken != null) {
            emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
            return ResponseEntity.ok("Reset token : " + resetToken);
        }
        return ResponseEntity.status(404).body("User not found");
    }

    @PostMapping("/resetpass")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean success = userService.resetPassword(request.getResetToken(), request.getNewPassword());
        if (success) {
            return ResponseEntity.ok("Password has been reset successfully.");
        }
        return ResponseEntity.status(400).body("Invalid or expired reset token.");
    }

    @GetMapping("/{userId}") // Fetch user by ID
    public ResponseEntity<User> getUserById(@PathVariable Long userId, @RequestParam String token) {
        if (!userService.validateJwtToken(token)) {
            return ResponseEntity.status(401).body(null);
        }
        User user = userService.fetchUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(403).body(null); // User not found
    }

    @PutMapping("/{userId}") // Update user details
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User updatedUser, @RequestParam String token) {
        if (!userService.validateJwtToken(token)) {
            return ResponseEntity.status(401).body(null);
        }
        User user = userService.updateUser(userId, updatedUser);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(403).body(null); // User not found
    }

    @DeleteMapping("/{userId}") // Delete user
    public ResponseEntity<String> deleteUser(@PathVariable Long userId, @RequestParam String token) {
        if (!userService.validateJwtToken(token)) {
            return ResponseEntity.status(401).body(null);
        }
        boolean isDeleted = userService.deleteUser(userId);
        if (isDeleted) {
            return ResponseEntity.ok("User deleted successfully.");
        }
        return ResponseEntity.status(403).body("User not found.");
    }

    public static class ResetPasswordRequest {

        private String resetToken;
        private String newPassword;

        public String getResetToken() {
            return resetToken;
        }

        public void setResetToken(String resetToken) {
            this.resetToken = resetToken;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }
}
