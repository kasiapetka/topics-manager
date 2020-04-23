package com.kasiapetka.topicsmanager.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class RegisterForm {
    private String album;
    private String code;
    private String email;
    private String password;

    public RegisterForm() {
    }

    public RegisterForm(String album, String code, String email, String password) {
        this.album = album;
        this.code = code;
        this.email = email;
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RegisterForm that = (RegisterForm) o;
        return Objects.equals(album, that.album) &&
                Objects.equals(code, that.code) &&
                Objects.equals(email, that.email) &&
                Objects.equals(password, that.password);
    }

    @Override
    public String toString() {
        return "Register{" +
                "album='" + album + '\'' +
                ", code='" + code + '\'' +
                ", newEmail='" + email + '\'' +
                ", newPassword='" + password + '\'' +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(album, code, email, password);
    }
}
