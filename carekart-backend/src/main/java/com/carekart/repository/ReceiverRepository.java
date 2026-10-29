package com.carekart.repository;


import com.carekart.model.Receiver;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ReceiverRepository extends MongoRepository<Receiver , String> {
    Optional<Receiver> findByReceiverId(String receiverId) ;
}
