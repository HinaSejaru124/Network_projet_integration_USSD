package com.network.projet.ussd.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Utility class for JSON parsing and mapping operations.
 * Provides methods to parse JSON strings, map to Java objects, and extract
 * specific fields.
 *
 * @author Network USSD Team
 * @version 1.0
 * @since 2026-01-10
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JsonMapper {

    private final ObjectMapper object_mapper;

    /**
     * Parses a JSON string into a JsonNode tree structure.
     *
     * @param json the JSON string to parse
     * @return Optional containing the parsed JsonNode, or empty if parsing fails
     */
    public Optional<JsonNode> parse(String json) {
        try {
            return Optional.ofNullable(object_mapper.readTree(json));
        } catch (JsonProcessingException error) {
            log.error("Failed to parse JSON: {}", error.getMessage());
            return Optional.empty();
        }
    }

    /**
     * Maps a JSON string to a specific Java class.
     *
     * @param json         the JSON string to map
     * @param target_class the target class type
     * @param <T>          the type of the target class
     * @return Optional containing the mapped object, or empty if mapping fails
     */
    public <T> Optional<T> mapTo(String json, Class<T> target_class) {
        try {
            return Optional.ofNullable(object_mapper.readValue(json, target_class));
        } catch (JsonProcessingException error) {
            log.error("Failed to map JSON to {}: {}", target_class.getSimpleName(), error.getMessage());
            return Optional.empty();
        }
    }

    /**
     * Extracts a specific field value from a JSON string.
     * This is a simple extraction using direct field access.
     * For complex path-based extraction, consider using JsonPath library.
     *
     * @param json      the JSON string
     * @param field_key the field key to extract
     * @return Optional containing the field value as string, or empty if field not
     *         found
     */
    public Optional<String> extractField(String json, String field_key) {
        return parse(json)
                .filter(node -> node.has(field_key))
                .map(node -> node.get(field_key).asText());
    }
}
