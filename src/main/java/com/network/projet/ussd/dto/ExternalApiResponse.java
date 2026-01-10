package com.network.projet.ussd.dto;

import com.network.projet.ussd.domain.enums.ApiResponseStatus;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

/**
 * Data Transfer Object representing the response from an external API call.
 * Contains status information, HTTP status code, response body, headers, and
 * error messages.
 *
 * @author Network USSD Team
 * @version 1.0
 * @since 2026-01-10
 */
@Data
@Builder
public class ExternalApiResponse {

    /**
     * Status of the API response (SUCCESS, ERROR, TIMEOUT, etc.)
     */
    private ApiResponseStatus status;

    /**
     * HTTP status code (200, 404, 500, etc.)
     */
    private int statusCode;

    /**
     * Response body as string (typically JSON)
     */
    private String body;

    /**
     * HTTP response headers
     */
    private Map<String, String> headers;

    /**
     * Error message if the request failed
     */
    private String errorMessage;
}
