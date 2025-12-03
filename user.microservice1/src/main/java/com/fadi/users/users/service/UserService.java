package com.fadi.users.users.service;
import com.fadi.users.users.entity.Role;
import com.fadi.users.users.entity.User;
import com.fadi.users.users.service.registre.RegistrationRequest;

import java.util.List;

public interface UserService {
  User saveUser(User user);
  User findUserByUsername (String username);
  Role addRole(Role role);
  User addRoleToUser(String username, String rolename);

  User registerUser(RegistrationRequest request);

  public void sendEmailUser(User u, String code);
  List<User> findAllUsers();

  public User validateToken(String code);
}
