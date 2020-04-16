package com.kasiapetka.topicsmanager.services;


public interface CodeService {
    String encode(String album);
    boolean matches(String code, String album);
}
