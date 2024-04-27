package com.group16.vesthub;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DataController {

    @PostMapping("/api/login")
    public boolean receiveDataFromFrontend(@RequestBody String data) {

        //böyle gelir: {"name":"John","age":30,"city":"New York"}
        System.out.println("Received data from frontend: " + data); 
        
        // Here you can add logic to handle the received data
        //burada kullanıcının tüm verileri fronta gönderilebilir doğru giriş yapılırsa
        return true;
    }
}

