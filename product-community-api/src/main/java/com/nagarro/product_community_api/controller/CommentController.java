package com.nagarro.product_community_api.controller;

import com.nagarro.product_community_api.dto.CommentRequest;
import com.nagarro.product_community_api.model.Comment;
import com.nagarro.product_community_api.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/by-question")
    public List<Comment> getCommentsByQuestionId(@RequestParam Long questionId) {
        return commentService.getCommentsByQuestionId(questionId);
    }

    @PostMapping
    public Comment add(@RequestBody CommentRequest request) {
        Comment comment = new Comment();
        comment.setQuestionId(request.getQuestionId());
        comment.setCommentText(request.getCommentText());
        comment.setCommentedBy(request.getCommentedBy());
        return commentService.add(comment);
    }

    // ✅ LIKE COMMENT API
    @PostMapping("/{id}/like")
    public Comment like(@PathVariable Long id) {
        return commentService.like(id);
    }
}

