package com.nagarro.product_community_api.dto;

import lombok.Data;

@Data
public class CommentRequest {
    private Long questionId;
    private String commentText;
    private String commentedBy;
}
