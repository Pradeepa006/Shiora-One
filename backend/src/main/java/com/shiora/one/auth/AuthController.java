package com.shiora.one.auth;

import com.shiora.one.common.ApiResponse;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        AuthResponse response = AuthResponse.builder()
                .accessToken("mock_access_jwt_token_shiora_one")
                .refreshToken("mock_refresh_jwt_token_shiora_one")
                .username(request.getEmail())
                .build();
        return ResponseEntity.ok(ApiResponse.success("Authentication successful", response));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest request) {
        AuthResponse response = AuthResponse.builder()
                .accessToken("mock_access_jwt_token_shiora_one")
                .refreshToken("mock_refresh_jwt_token_shiora_one")
                .username(request.getUsername())
                .build();
        return ResponseEntity.ok(ApiResponse.success("Registration successful", response));
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class RegisterRequest {
        private String username;
        private String displayName;
        private String email;
        private String password;
    }

    @Data
    @Builder
    public static class AuthResponse {
        private String accessToken;
        private String refreshToken;
        private String username;
    }
}
