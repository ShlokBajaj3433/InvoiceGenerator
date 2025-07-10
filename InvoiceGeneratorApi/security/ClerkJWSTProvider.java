import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.util.HashSet;
import java.util.Set;

@Component
public class ClerkJWSTProvider {

    @Value("${clerk.jwks-url}")
    private String jwksUrl;

    public JWTClaimsSet validateToken(String token) throws ParseException, BadJOSEException, MalformedURLException {
        ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();

        // Set the required JWS algorithm
        Set<JWSAlgorithm> expectedJWSAlgorithms = new HashSet<>();
        expectedJWSAlgorithms.add(JWSAlgorithm.RS256);

        // Configure the JWK source
        URL jwkSetURL = new URL(jwksUrl);
        RemoteJWKSet<SecurityContext> jwkSet = new RemoteJWKSet<>(jwkSetURL);

        // Create a JWS key selector
        JWSKeySelector<SecurityContext> keySelector = new JWSVerificationKeySelector<>(
                JWSAlgorithm.RS256,
                jwkSet
        );
        jwtProcessor.setJWSKeySelector(keySelector);

        // Process the token
        return jwtProcessor.process(token, null);
    }
}
