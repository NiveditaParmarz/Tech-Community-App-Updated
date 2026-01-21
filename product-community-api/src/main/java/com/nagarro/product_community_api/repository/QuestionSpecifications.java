package com.nagarro.product_community_api.repository;

import com.nagarro.product_community_api.model.Question;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class QuestionSpecifications {

    public static Specification<Question> hasText(String text) {
        return (root, query, cb) ->
                text == null ? null :
                        cb.like(cb.lower(root.get("questionText")), "%" + text.toLowerCase() + "%");
    }

    public static Specification<Question> hasUser(String email) {
        return (root, query, cb) ->
                email == null ? null :
                        cb.equal(root.get("createdBy"), email);
    }

    public static Specification<Question> hasTag(String tag) {
        return (root, query, cb) ->
                tag == null ? null :
                        cb.like(cb.lower(root.get("tags")), "%" + tag.toLowerCase() + "%");
    }

    public static Specification<Question> hasDate(LocalDate date) {
        return (root, query, cb) ->
                date == null ? null :
                        cb.equal(root.get("createdDate"), date);
    }
}
