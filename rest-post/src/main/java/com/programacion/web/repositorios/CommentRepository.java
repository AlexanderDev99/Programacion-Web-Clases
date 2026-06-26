package com.programacion.web.repositorios;

import com.programacion.web.db.Comment;
import org.apache.deltaspike.data.api.FullEntityRepository;
import org.apache.deltaspike.data.api.Repository;

@Repository
public interface CommentRepository extends FullEntityRepository<Comment, Integer> {
}
