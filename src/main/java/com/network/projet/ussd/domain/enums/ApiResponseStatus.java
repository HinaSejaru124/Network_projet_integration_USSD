package com.network.projet.ussd.domain.enums;

/**
 * Enumeration representing possible statuses of an external API response.
 * Used to categorize the outcome of API calls for proper error handling and
 * flow control.
 *
 * @author Network USSD Team
 * @version 1.0
 * @since 2026-01-10
 */
public enum ApiResponseStatus {

    /**
     * API call completed successfully with 2xx status code
     */
    SUCCESS,

    /**
     * API call failed with 4xx status code (client error)
     */
    CLIENT_ERROR,

    /**
     * API call failed with 5xx status code (server error)
     */
    SERVER_ERROR,

    /**
     * API call exceeded the configured timeout duration
     */
    TIMEOUT,

    /**
     * Network connectivity issue prevented the API call
     */
    NETWORK_ERROR,

    /**
     * Unknown or unclassified error occurred
     */
    UNKNOWN_ERROR
}
