package in.ShlokBajaj.InvoiceGeneratorApi.controller;

    
import in.ShlokBajaj.InvoiceGeneratorApi.entity.User;
import in.ShlokBajaj.InvoiceGeneratorApi.repository.UserReporitoty;
import in.ShlokBajaj.InvoiceGeneratorApi.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;



    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public User createOrUpdateUser(@RequestBody User user, Authentication authentication) {
        try {
            if (!authentication.getName().equals(user.getClerkUserId())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not have permission");
            }
            return userService.saveOrUpdateUser(user);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

