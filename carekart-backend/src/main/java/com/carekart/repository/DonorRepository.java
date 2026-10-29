package com.carekart.repository;

import com.carekart.model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DonorRepository extends MongoRepository<Donor, String>{
    Optional<Donor> findByDonorId(String donorId) ;
}
