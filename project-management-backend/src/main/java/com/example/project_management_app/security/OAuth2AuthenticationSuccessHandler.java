package com.example.project_management_app.security;

import com.example.project_management_app.entity.User;
import com.example.project_management_app.service.AccountService;
import com.example.project_management_app.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AccountService accountService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        if (authentication instanceof OAuth2AuthenticationToken oauthToken) {
            String email = oauthToken.getPrincipal().getAttribute("email");
            String name = oauthToken.getPrincipal().getAttribute("name");
            String provider = oauthToken.getAuthorizedClientRegistrationId();

            if (email != null) {
                // Find or create the user, then generate JWT with their USERNAME (not email)
                User user = accountService.processOAuthLogin(email, name != null ? name : email, provider);
                String jwt = jwtUtil.generateToken(user.getUsername());
                response.sendRedirect("http://localhost:3000/oauth2/redirect?token=" + jwt + "&username=" + user.getUsername());
                return;
            }
        }
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
