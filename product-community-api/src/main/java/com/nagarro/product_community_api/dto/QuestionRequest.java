package com.nagarro.product_community_api.dto;

import lombok.Data;

@Data
public class QuestionRequest {
    private String questionText;
    private String tags;
    private String createdBy;
}
