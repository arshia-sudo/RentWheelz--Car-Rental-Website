package com.infernitex.car_rental_backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EmailService {

    @Value("${brevo.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public EmailService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        String subject = "Password Reset Request";
        String htmlContent = "<html><body style='font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;'>"
                + "<div style='max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>"
                + "<h1 style='color: #333; margin-bottom: 16px;'>Password Reset</h1>"
                + "<p style='color: #555; line-height: 1.6;'>We received a request to reset your password. Please use the token below to reset your password within the next 3 minutes:</p>"
                + "<p style='margin: 20px 0;'><strong>Reset Token:</strong></p>"
                + "<p style='background-color: #f1f1f1; padding: 10px; border-radius: 5px; font-size: 16px; word-break: break-word;'>" + resetToken + "</p>"
                + "<p style='color: #555; line-height: 1.6;'>If you didn’t request a password reset, you can safely ignore this email.</p>"
                + "<p style='color: #888; font-size: 14px; line-height: 1.6;'>Thanks,<br>The RentWheelZ Team</p>"
                + "</div></body></html>";
        
        sendEmail(toEmail, subject, htmlContent);
    }

    public void sendBookingConfirmationEmail(String toEmail, String bookingDetails) {
        String subject = "Booking Confirmation";
        String htmlContent = "<html><body style='font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;'>"
                + "<div style='max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>"
                + "<h1 style='color: #333; margin-bottom: 16px;'>Booking Confirmed</h1>"
                + "<p style='color: #555; line-height: 1.6;'>Your booking has been successfully confirmed! Here are the details:</p>"
                + "<p style='background-color: #f1f1f1; padding: 10px; border-radius: 5px; font-size: 16px; word-break: break-word;'>" + bookingDetails + "</p>"
                + "<p style='color: #555; line-height: 1.6;'>Thank you for choosing RentWheelZ!</p>"
                + "<p style='color: #888; font-size: 14px; line-height: 1.6;'>Best regards,<br>The RentWheelZ Team</p>"
                + "</div></body></html>";

        sendEmail(toEmail, subject, htmlContent);
    }

    public void sendBookingCancellationEmail(String toEmail, String cancellationDetails) {
        String subject = "Booking Cancellation";
        String htmlContent = "<html><body style='font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;'>"
                + "<div style='max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>"
                + "<h1 style='color: #333; margin-bottom: 16px;'>Booking Cancelled</h1>"
                + "<p style='color: #555; line-height: 1.6;'>Your booking has been cancelled. Here are the details:</p>"
                + "<p style='background-color: #f1f1f1; padding: 10px; border-radius: 5px; font-size: 16px; word-break: break-word;'>" + cancellationDetails + "</p>"
                + "<p style='color: #555; line-height: 1.6;'>We hope to serve you in the future.</p>"
                + "<p style='color: #888; font-size: 14px; line-height: 1.6;'>Best regards,<br>The RentWheelZ Team</p>"
                + "</div></body></html>";

        sendEmail(toEmail, subject, htmlContent);
    }

    private void sendEmail(String toEmail, String subject, String htmlContent) {
        String url = "https://api.brevo.com/v3/smtp/email";

        HttpHeaders headers = new HttpHeaders();
        headers.set("api-key", apiKey);
        headers.set("Content-Type", "application/json");

        Map<String, Object> emailData = new HashMap<>();
        emailData.put("sender", Map.of("name", "RentWheelZ Developer", "email", "infernitex@outlook.com"));
        emailData.put("to", List.of(Map.of("email", toEmail)));
        emailData.put("subject", subject);
        emailData.put("htmlContent", htmlContent);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(emailData, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url, HttpMethod.POST, request, String.class);

        System.out.println(response);
    }
}
