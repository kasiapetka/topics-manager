package com.kasiapetka.topicsmanager.services.impl;

import com.kasiapetka.topicsmanager.services.CodeService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CodeServiceImpl implements CodeService {

    // seed is value from 1-9
    @Value("${spring.value.seed}")
    public int SEED;

    // ascii values ONLY from 33 to 126
    // numbers are from 48 to 57

    // change string to ascii array
    // first code[0]+code[5]
    // second code[0] + 10 + seed
    // third code[3]+(seed * 5)
    // forth code[4] + seed*2 + code[3] - 49
    // fifth code[4] + code[5] - code[0] + seed
    // sixth code[5] + 2(code%seed)

    @Override
    public String encode(String album) {
//        System.out.println("Seed = " + SEED);


        char start[] = album.toCharArray();
        char[] code = new char[album.length()];
        int encodedAscii;
        int condition = Integer.parseInt(album)%5;

        switch(condition){
            case 0:
                encodedAscii = (int)start[0] + (int)start[5];
                code[0] = (char)encodedAscii;

                encodedAscii = (int)start[0] + 10 + SEED;
                code[1] = (char)encodedAscii;

                encodedAscii = (int)start[3] + SEED*5;
                code[2] = (char)encodedAscii;

                encodedAscii = (int)start[4] + SEED*2 + (int)start[3] - 49;
                code[3] = (char)encodedAscii;

                encodedAscii = (int)start[4] + (int)start[5] - (int)start[0] + SEED;
                code[4] = (char)encodedAscii;

                encodedAscii = (int)start[5] + 2*(start[5]%SEED);
                code[5] = (char)encodedAscii;
                break;
            case 1:
                encodedAscii = (int)start[0] + (int)start[5];
                code[0] = (char)encodedAscii;

                encodedAscii = (int)start[0] + 10 + SEED;
                code[2] = (char)encodedAscii;

                encodedAscii = (int)start[3] + SEED*5;
                code[1] = (char)encodedAscii;

                encodedAscii = (int)start[4] + SEED*2 + (int)start[3] - 49;
                code[3] = (char)encodedAscii;

                encodedAscii = (int)start[4] + (int)start[5] - (int)start[0] + SEED;
                code[5] = (char)encodedAscii;

                encodedAscii = (int)start[5] + 2*(start[5]%SEED);
                code[4] = (char)encodedAscii;
                break;
            case 2:

                encodedAscii = (int)start[0] + (int)start[5];
                code[5] = (char)encodedAscii;

                encodedAscii = (int)start[0] + 10 + SEED;
                code[4] = (char)encodedAscii;

                encodedAscii = (int)start[3] + SEED*5;
                code[3] = (char)encodedAscii;

                encodedAscii = (int)start[4] + SEED*2 + (int)start[3] - 49;
                code[2] = (char)encodedAscii;

                encodedAscii = (int)start[4] + (int)start[5] - (int)start[0] + SEED;
                code[1] = (char)encodedAscii;

                encodedAscii = (int)start[5] + 2*(start[5]%SEED);
                code[0] = (char)encodedAscii;
                break;
            case 3:

                encodedAscii = (int)start[0] + (int)start[5];
                code[3] = (char)encodedAscii;

                encodedAscii = (int)start[0] + 10 + SEED;
                code[2] = (char)encodedAscii;

                encodedAscii = (int)start[3] + SEED*5;
                code[4] = (char)encodedAscii;

                encodedAscii = (int)start[4] + SEED*2 + (int)start[3] - 49;
                code[1] = (char)encodedAscii;

                encodedAscii = (int)start[4] + (int)start[5] - (int)start[0] + SEED;
                code[5] = (char)encodedAscii;

                encodedAscii = (int)start[5] + 2*(start[5]%SEED);
                code[0] = (char)encodedAscii;
                break;
            case 4:

                encodedAscii = (int)start[0] + (int)start[5];
                code[0] = (char)encodedAscii;

                encodedAscii = (int)start[0] + 10 + SEED;
                code[5] = (char)encodedAscii;

                encodedAscii = (int)start[3] + SEED*5;
                code[1] = (char)encodedAscii;

                encodedAscii = (int)start[4] + SEED*2 + (int)start[3] - 49;
                code[4] = (char)encodedAscii;

                encodedAscii = (int)start[4] + (int)start[5] - (int)start[0] + SEED;
                code[2] = (char)encodedAscii;

                encodedAscii = (int)start[5] + 2*(start[5]%SEED);
                code[3] = (char)encodedAscii;
                break;
        }


        System.out.println(code);

        return String.valueOf(code);
    }

    @Override
    public boolean matches(String code, String album) {
        if(code.equals(encode(album))){
            return true;
        } else {
            return false;
        }
    }
}
