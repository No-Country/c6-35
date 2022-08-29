package com.back.wg_assigner.security.controller;


import com.back.wg_assigner.security.dto.JwtDto;
import com.back.wg_assigner.security.dto.LoginUser;
import com.back.wg_assigner.security.dto.NewUser;
import com.back.wg_assigner.security.entity.RoleSecurity;
import com.back.wg_assigner.security.entity.UserSecurity;
import com.back.wg_assigner.security.enums.RoleName;
import com.back.wg_assigner.security.jwt.JwtProvider;
import com.back.wg_assigner.security.service.RoleService;
import com.back.wg_assigner.security.service.UserServiceSecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserServiceSecurity userServiceSecurity;

    @Autowired
    RoleService roleService;

    @Autowired
    JwtProvider jwtProvider;

    @PostMapping("/new")
    public ResponseEntity<?> adduser (@Valid @RequestBody NewUser newUser, BindingResult bindingResult){
        if(bindingResult.hasErrors())
            return new ResponseEntity("Invalid email or field error", HttpStatus.BAD_REQUEST);
        if(userServiceSecurity.existsByEmail(newUser.getUsername()))
            return new ResponseEntity("Username exist", HttpStatus.BAD_REQUEST);
        if(userServiceSecurity.existsByEmail(newUser.getEmail()))
            return new ResponseEntity("Email exist", HttpStatus.BAD_REQUEST);
        UserSecurity user = new UserSecurity(newUser.getName(), newUser.getUsername(), newUser.getEmail(),
                passwordEncoder.encode(newUser.getPassword()));
        Set<RoleSecurity> roleSecurities = new HashSet<>();
        roleSecurities.add(roleService.getByRoleName(RoleName.ROLE_USER).get());
        if(newUser.getRoles().contains("admin"))
            roleSecurities.add(roleService.getByRoleName(RoleName.ROLE_ADMIN).get());
        user.setRoles(roleSecurities);
        userServiceSecurity.save(user);
        return new ResponseEntity("User saved successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginUser loginUser, BindingResult bindingResult){
        if(bindingResult.hasErrors())
            return new ResponseEntity("Field error", HttpStatus.BAD_REQUEST);
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
        return new ResponseEntity(jwtDto, HttpStatus.OK);
    }
}