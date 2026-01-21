package com.nagarro.product_community_api.controller;

import com.nagarro.product_community_api.dto.QuestionRequest;
import com.nagarro.product_community_api.model.Question;
import com.nagarro.product_community_api.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping
    public Question post(@RequestBody QuestionRequest request) {
        return questionService.postQuestion(request);
    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id).orElseThrow(() -> 
            new RuntimeException("Question not found with id: " + id)
        );
    }

    @GetMapping("/search")
    public Page<Question> search(
            @RequestParam(required = false) String text,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "newest") String sort
    ) {
        Sort sortDirection = sort.equals("oldest") 
            ? Sort.by("createdDate").ascending() 
            : Sort.by("createdDate").descending();
            
        Pageable pageable = PageRequest.of(page, size, sortDirection);

        return questionService.search(
                text, email, tag, date, pageable
        );
    }
}
