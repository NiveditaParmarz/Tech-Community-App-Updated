package com.nagarro.product_community_api.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
