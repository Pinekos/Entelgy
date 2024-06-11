package com.entelgy.project.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entelgy.project.demo.Entity.Comentario;
import com.entelgy.project.demo.Service.ComentarioService;

@RestController
@RequestMapping("/api/comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    @PostMapping
    public Comentario createComentario(@RequestBody Comentario comentario) {
        return comentarioService.saveComentario(comentario);
    }
}
