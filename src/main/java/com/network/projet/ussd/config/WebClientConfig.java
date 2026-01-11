package com.network.projet.ussd.config;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

/**
 * Configuration class for WebClient with custom timeout settings.
 * Provides reactive HTTP client for external API calls with connection, read,
 * and write timeouts.
 *
 * @author Network USSD Team
 * @version 1.0
 * @since 2026-01-10
 */
@Configuration
public class WebClientConfig {

    private static final int CONNECT_TIMEOUT_MS = 10000;
    private static final int READ_TIMEOUT_MS = 30000;
    private static final int WRITE_TIMEOUT_MS = 30000;

    /**
     * Creates a configured WebClient.Builder bean with timeout settings.
     * Configures connection timeout (10s), read timeout (30s), and write timeout
     * (30s).
     *
     * @return WebClient.Builder with configured HTTP client
     */
    @Bean
    public WebClient.Builder webClientBuilder() {
        HttpClient http_client = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, CONNECT_TIMEOUT_MS)
                .responseTimeout(Duration.ofMillis(READ_TIMEOUT_MS))
                .doOnConnected(connection -> connection
                        .addHandlerLast(new ReadTimeoutHandler(READ_TIMEOUT_MS, TimeUnit.MILLISECONDS))
                        .addHandlerLast(new WriteTimeoutHandler(WRITE_TIMEOUT_MS, TimeUnit.MILLISECONDS)));

        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(http_client));
    }
}
