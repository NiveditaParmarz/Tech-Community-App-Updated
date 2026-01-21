package com.nagarro.product_community_api.service;

import com.nagarro.product_community_api.model.Comment;
import com.nagarro.product_community_api.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment add(Comment comment) {
        comment.setLikes(0);
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByQuestionId(Long questionId) {
        return commentRepository.findByQuestionId(questionId);
    }

    public Comment like(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        comment.setLikes(comment.getLikes() + 1);
        return commentRepository.save(comment);
    }
}
