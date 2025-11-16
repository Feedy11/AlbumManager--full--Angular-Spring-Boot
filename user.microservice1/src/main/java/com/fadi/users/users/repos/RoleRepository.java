package com.fadi.users.users.repos;


import com.fadi.users.users.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;



public interface RoleRepository extends JpaRepository<Role, Long> {
  Role findByRole(String role);
}
