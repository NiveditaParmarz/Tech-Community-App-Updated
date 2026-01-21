package com.nagarro.product_community_api.service;

import com.nagarro.product_community_api.dto.QuestionRequest;
import com.nagarro.product_community_api.model.Comment;
import com.nagarro.product_community_api.model.Question;
import com.nagarro.product_community_api.repository.CommentRepository;
import com.nagarro.product_community_api.repository.QuestionRepository;
import com.nagarro.product_community_api.repository.QuestionSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private CommentRepository commentRepository;

    public Question postQuestion(QuestionRequest request) {
        Question q = new Question();
        q.setQuestionText(request.getQuestionText());
        q.setTags(request.getTags());
        q.setCreatedBy(request.getCreatedBy());
        q.setCreatedDate(LocalDate.now());

        return questionRepository.save(q);
    }

    public Optional<Question> getQuestionById(Long id) {
        Optional<Question> question = questionRepository.findById(id);
        
        // Increment view count if question exists
        if (question.isPresent()) {
            Question q = question.get();
            q.setViews(q.getViews() != null ? q.getViews() + 1 : 1);
            questionRepository.save(q);
        }
        
        return question;
    }

    public Page<Question> search(
            String text,
            String email,
            String tag,
            LocalDate date,
            Pageable pageable
    ) {
        Specification<Question> spec = Specification
                .where(QuestionSpecifications.hasText(text))
                .and(QuestionSpecifications.hasUser(email))
                .and(QuestionSpecifications.hasTag(tag))
                .and(QuestionSpecifications.hasDate(date));

        Page<Question> questions = questionRepository.findAll(spec, pageable);
        
        // Calculate comments count for each question
        for (Question question : questions.getContent()) {
            List<Comment> comments = commentRepository.findByQuestionId(question.getId());
            question.setCommentsCount(comments.size());
        }
        
        return questions;
    }
}
