package in.ShlokBajaj.InvoiceGeneratorApi.controller;

    
import in.ShlokBajaj.InvoiceGeneratorApi.entity.User;
import in.ShlokBajaj.InvoiceGeneratorApi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/clerk/{clerkUserId}")
    public ResponseEntity<User> getUserByClerkUserId(@PathVariable String clerkUserId) {
        return ResponseEntity.ok(userService.findbyClerkUserId(clerkUserId));
    }

    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
        User existingUser = userService.findById(id);
        existingUser.setClerkUserId(user.getClerkUserId());
        existingUser.setEmail(user.getEmail());
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        return ResponseEntity.ok(userService.saveUser(existingUser));
    }

    

}


