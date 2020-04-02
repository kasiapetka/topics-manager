package com.kasiapetka.topicsmanager.parsingClasses;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class AuthenticationResponse {
    private String token;

    public AuthenticationResponse() {
    }

    public AuthenticationResponse(String token) {
        this.token = token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthenticationResponse that = (AuthenticationResponse) o;
        return Objects.equals(token, that.token);
    }

    @Override
    public int hashCode() {
        return Objects.hash(token);
    }

    @Override
    public String toString() {
        return "LoginToken{" +
                "token='" + token + '\'' +
                '}';
    }
}
