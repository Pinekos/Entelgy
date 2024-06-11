package com.entelgy.project.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entelgy.project.demo.Entity.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario, Long>{
    
}
