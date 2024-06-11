package com.entelgy.project.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entelgy.project.demo.Entity.Comentario;
import com.entelgy.project.demo.Repository.ComentarioRepository;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    public Comentario saveComentario(Comentario comentario) {
        return comentarioRepository.save(comentario);
    }
}
