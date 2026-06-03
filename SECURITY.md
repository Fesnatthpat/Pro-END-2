# Security Guide: SSL/TLS Certificate

To resolve the vulnerability "Obtain and install a valid SSL/TLS certificate", follow these instructions based on your environment.

## Production Environment (Nginx + Let's Encrypt)

If you are hosting on a Linux server with Nginx, use Let's Encrypt with Certbot.

1. **Install Certbot and Nginx plugin:**
   ```bash
   sudo apt update
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain and install the certificate:**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```
   Follow the prompts. Certbot will automatically configure Nginx to use the certificate and set up a redirect from HTTP to HTTPS.

3. **Verify Auto-renewal:**
   ```bash
   sudo certbot renew --dry-run
   ```

## Development Environment (mkcert)

To use HTTPS locally, it is recommended to use `mkcert`.

1. **Install mkcert:**
   - macOS: `brew install mkcert`
   - Windows: `choco install mkcert`
   - Linux: `sudo apt install mkcert`

2. **Setup local CA:**
   ```bash
   mkcert -install
   ```

3. **Generate certificates for localhost:**
   ```bash
   mkdir -p .ssl
   mkcert -key-file .ssl/localhost-key.pem -cert-file .ssl/localhost.pem localhost 127.0.0.1 ::1
   ```

4. **Update `nuxt.config.ts` to use the certificates:**
   ```typescript
   export default defineNuxtConfig({
     devServer: {
       https: {
         key: './.ssl/localhost-key.pem',
         cert: './.ssl/localhost.pem'
       }
     }
   })
   ```

## Application-level Enforcement

The application has been updated in `server/middleware/security-headers.ts` to:
- Redirect HTTP to HTTPS in production.
- Enforce Strict-Transport-Security (HSTS).
- Set standard security headers (X-Frame-Options, X-Content-Type-Options, etc.).
