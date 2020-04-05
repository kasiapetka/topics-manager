package com.kasiapetka.topicsmanager.parsingClasses;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class EditAccount {
    private String email;
    private String password;
    private String name;
    private String surname;
    private String newEmail;
    private String newPassword;

    public EditAccount(){

    }

    public EditAccount(String email, String password, String newEmail, String newPassword, String name, String surname) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.newEmail = newEmail;
        this.newPassword = newPassword;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EditAccount that = (EditAccount) o;
        return Objects.equals(email, that.email) &&
                Objects.equals(password, that.password) &&
                Objects.equals(name, that.name) &&
                Objects.equals(surname, that.surname) &&
                Objects.equals(newEmail, that.newEmail) &&
                Objects.equals(newPassword, that.newPassword);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, password, name, surname, newEmail, newPassword);
    }

    @Override
    public String toString() {
        return "EditAccount{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", newEmail='" + newEmail + '\'' +
                ", newPassword='" + newPassword + '\'' +
                '}';
    }
}
