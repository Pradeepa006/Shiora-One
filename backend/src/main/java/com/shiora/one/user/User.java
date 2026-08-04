package com.shiora.one.user;

import com.shiora.one.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * Core user entity — the heart of Shiora One workspace.
 */
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_users_email", columnList = "email"),
    @Index(name = "idx_users_username", columnList = "username")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Column(name = "email", unique = true, nullable = false, length = 255)
    private String email;

    @Column(name = "username", unique = true, nullable = false, length = 50)
    private String username;

    @Column(name = "display_name", nullable = false, length = 100)
    private String displayName;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "avatar_url", length = 512)
    private String avatarUrl;

    @Column(name = "avatar_public_id")
    private String avatarPublicId;

    @Column(name = "bio", length = 500)
    private String bio;

    @Column(name = "timezone", length = 50)
    @Builder.Default
    private String timezone = "UTC";

    @Column(name = "locale", length = 10)
    @Builder.Default
    private String locale = "en";

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    @Builder.Default
    private UserRole role = UserRole.USER;

    @Column(name = "is_email_verified")
    @Builder.Default
    private boolean emailVerified = false;

    @Column(name = "is_active")
    @Builder.Default
    private boolean active = true;

    @Column(name = "google_id", unique = true)
    private String googleId;

    @Column(name = "provider")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private AuthProvider provider = AuthProvider.LOCAL;

    @Column(name = "current_theme", length = 50)
    @Builder.Default
    private String currentTheme = "japanese";

    @Column(name = "onboarding_completed")
    @Builder.Default
    private boolean onboardingCompleted = false;

    public enum UserRole { USER, ADMIN, PREMIUM }
    public enum AuthProvider { LOCAL, GOOGLE }
}
