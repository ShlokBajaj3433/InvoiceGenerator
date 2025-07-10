package in.ShlokBajaj.InvoiceGeneratorApi.service;

import org.springframework.stereotype.Service;

import in.ShlokBajaj.InvoiceGeneratorApi.entity.User;
import in.ShlokBajaj.InvoiceGeneratorApi.repository.UserReporitoty;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserReporitoty userReporitoty;

    public User findbyClerkUserId(String clerkUserId){
        return userReporitoty.findByClerkUserId(clerkUserId);
    }

    public User saveUser(User user){
        return userReporitoty.save(user);
    }


    public void deleteUser(String id){
        userReporitoty.deleteById(id);
    }


    public User findById(String id) {
        return userReporitoty.findById(id)
                .orElseThrow(() -> new RuntimeException("User with id " + id + " does not exist"));
    }
    



}
