package com.kasiapetka.topicsmanager.parsingClasses;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class EditAccount {
    private long id;
    private String email;
    private String password;
    private String name;
    private String surname;
    private String newEmail;
    private String newPassword;
    private String newName;
    private String newSurname;

    public EditAccount(){

    }

    public EditAccount(long id, String email, String password, String name, String surname, String newEmail, String newPassword, String newName, String newSurname) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.newEmail = newEmail;
        this.newPassword = newPassword;
        this.newName = newName;
        this.newSurname = newSurname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EditAccount that = (EditAccount) o;
        return id == that.id &&
                Objects.equals(email, that.email) &&
                Objects.equals(password, that.password) &&
                Objects.equals(name, that.name) &&
                Objects.equals(surname, that.surname) &&
                Objects.equals(newEmail, that.newEmail) &&
                Objects.equals(newPassword, that.newPassword) &&
                Objects.equals(newName, that.newName) &&
                Objects.equals(newSurname, that.newSurname);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, password, name, surname, newEmail, newPassword, newName, newSurname);
    }

    @Override
    public String toString() {
        return "EditAccount{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", newEmail='" + newEmail + '\'' +
                ", newPassword='" + newPassword + '\'' +
                ", newName='" + newName + '\'' +
                ", newSurname='" + newSurname + '\'' +
                '}';
    }
}
