package com.carekart.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Admin")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    @Id
    private String id ;

    @Indexed(unique = true)
    private String adminId ;
    @NotBlank
    private String name ;
    @NotBlank
    private String password ;
    @NotBlank
    private String phoneNumber ;
    @NotBlank
    private String email ;
}
