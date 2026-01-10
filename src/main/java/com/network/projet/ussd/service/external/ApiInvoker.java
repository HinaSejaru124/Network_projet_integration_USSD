package com.network.projet.ussd.service.external;

import com.network.projet.ussd.domain.enums.ApiResponseStatus;
import com.network.projet.ussd.dto.ExternalApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.concurrent.TimeoutException;

/**
 * Service responsible for invoking external APIs with support for various HTTP
 * methods.
 * Handles GET, POST, PUT, and DELETE requests with comprehensive error handling
 * and timeout management.
 *
 * @author Network USSD Team
 * @version 1.0
 * @since 2026-01-10
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ApiInvoker {

    private final WebClient.Builder web_client_builder;

    /**
     * Executes a GET request to the specified URL.
     *
     * @param url     the target URL for the GET request
     * @param headers optional HTTP headers to include in the request
     * @return Mono containing the API response with status and body
     */
    public Mono<ExternalApiResponse> makeGetRequest(String url, Map<String, String> headers) {
        return executeRequest(url, HttpMethod.GET, null, headers);
    }

    /**
     * Executes a POST request to the specified URL with a request body.
     *
     * @param url     the target URL for the POST request
     * @param body    the request body to send
     * @param headers optional HTTP headers to include in the request
     * @return Mono containing the API response with status and body
     */
    public Mono<ExternalApiResponse> makePostRequest(String url, Object body, Map<String, String> headers) {
        return executeRequest(url, HttpMethod.POST, body, headers);
    }

    /**
     * Executes a PUT request to the specified URL with a request body.
     *
     * @param url     the target URL for the PUT request
     * @param body    the request body to send
     * @param headers optional HTTP headers to include in the request
     * @return Mono containing the API response with status and body
     */
    public Mono<ExternalApiResponse> makePutRequest(String url, Object body, Map<String, String> headers) {
        return executeRequest(url, HttpMethod.PUT, body, headers);
    }

    /**
     * Executes a DELETE request to the specified URL.
     *
     * @param url     the target URL for the DELETE request
     * @param headers optional HTTP headers to include in the request
     * @return Mono containing the API response with status and body
     */
    public Mono<ExternalApiResponse> makeDeleteRequest(String url, Map<String, String> headers) {
        return executeRequest(url, HttpMethod.DELETE, null, headers);
    }

    /**
     * Core method for executing HTTP requests with error handling.
     *
     * @param url     the target URL
     * @param method  the HTTP method (GET, POST, PUT, DELETE)
     * @param body    optional request body
     * @param headers optional HTTP headers
     * @return Mono containing the API response
     */
    private Mono<ExternalApiResponse> executeRequest(String url, HttpMethod method, Object body,
            Map<String, String> headers) {
        WebClient client = web_client_builder.build();
        WebClient.RequestBodySpec request_spec = client.method(method).uri(url);

        if (headers != null) {
            request_spec.headers(http_headers -> headers.forEach(http_headers::add));
        }

        if (body != null) {
            request_spec.bodyValue(body);
        }

        return request_spec.retrieve()
                .toEntity(String.class)
                .map(response_entity -> ExternalApiResponse.builder()
                        .status(ApiResponseStatus.SUCCESS)
                        .statusCode(response_entity.getStatusCode().value())
                        .body(response_entity.getBody())
                        .headers(response_entity.getHeaders().toSingleValueMap())
                        .build())
                .onErrorResume(error -> handleException(error, url, method));
    }

    /**
     * Handles exceptions that occur during API calls and maps them to appropriate
     * response statuses.
     *
     * @param error  the exception that occurred
     * @param url    the URL that was being called
     * @param method the HTTP method used
     * @return Mono containing the error response
     */
    private Mono<ExternalApiResponse> handleException(Throwable error, String url, HttpMethod method) {
        log.error("Error calling external API [{} {}]: {}", method, url, error.getMessage());

        ExternalApiResponse.ExternalApiResponseBuilder response_builder = ExternalApiResponse.builder()
                .errorMessage(error.getMessage());

        if (error instanceof WebClientResponseException web_client_exception) {
            response_builder.status(web_client_exception.getStatusCode().is5xxServerError()
                    ? ApiResponseStatus.SERVER_ERROR
                    : ApiResponseStatus.CLIENT_ERROR)
                    .statusCode(web_client_exception.getStatusCode().value())
                    .body(web_client_exception.getResponseBodyAsString());
        } else if (error instanceof TimeoutException || error instanceof java.net.SocketTimeoutException) {
            response_builder.status(ApiResponseStatus.TIMEOUT);
        } else {
            response_builder.status(ApiResponseStatus.NETWORK_ERROR);
        }

        return Mono.just(response_builder.build());
    }
}
