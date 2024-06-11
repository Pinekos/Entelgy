package com.entelgy.project.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.entelgy.project.demo.Entity.User;
import com.entelgy.project.demo.Repository.UserRepository;

@Service
public class JpaUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException(
                    String.format("Usuario %s no se encuentra en la base de datos", username));
        }

        User user = userOptional.orElseThrow();

        /*List<GrantedAuthority> roles = user.getRoles()
                .stream()
                .map(rol -> new SimpleGrantedAuthority(rol.getNombre()))
                .collect(Collectors.toList());*/

        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPassword(),
                true, true, true, false, null);

    }

}
