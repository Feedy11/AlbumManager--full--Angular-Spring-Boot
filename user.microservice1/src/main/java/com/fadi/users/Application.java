package com.fadi.users;

import com.fadi.users.users.entity.Role;
import com.fadi.users.users.entity.User;
import com.fadi.users.users.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class Application {

  @Autowired
  UserService userService;

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }


/*
  @PostConstruct
  void init_users() {
    userService.addRole(new Role(null, "ADMIN"));
    userService.addRole(new Role(null, "USER"));

    userService.saveUser(new User(null, "admin", "123", true, null));
    userService.saveUser(new User(null, "fadi", "123", true, null));
    userService.saveUser(new User(null, "yassine", "123", true, null));

    userService.addRoleToUser("admin", "ADMIN");
    userService.addRoleToUser("admin", "USER");
    userService.addRoleToUser("fadi", "USER");
    userService.addRoleToUser("yassine", "USER");
  }
*/
}
