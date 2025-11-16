package com.fadi.users.users.service;


import com.fadi.users.users.entity.Role;
import com.fadi.users.users.entity.User;
import com.fadi.users.users.repos.RoleRepository;
import com.fadi.users.users.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;


@Transactional
@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRep;

  @Autowired
  private RoleRepository roleRep;

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public User saveUser(User user) {
    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
    return userRep.save(user);
  }

  @Override
  public User addRoleToUser(String username, String rolename) {
    User usr = userRep.findByUsername(username);
    Role r = roleRep.findByRole(rolename);
    usr.getRoles().add(r);
    return userRep.save(usr);
  }

  @Override
  public Role addRole(Role role) {
    return roleRep.save(role);
  }

  @Override
  public User findUserByUsername(String username) {
    return userRep.findByUsername(username);
  }
  @Override
  public List<User> findAllUsers() {
    return userRep.findAll();
  }
}
