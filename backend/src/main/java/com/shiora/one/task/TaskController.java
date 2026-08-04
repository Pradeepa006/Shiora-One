package com.shiora.one.task;

import com.shiora.one.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/tasks")
@RequiredArgsConstructor
public class TaskController {

    @GetMapping
    public ResponseEntity<ApiResponse<List<String>>> getTasks() {
        return ResponseEntity.ok(ApiResponse.success("Tasks fetched successfully", List.of("Spring Security Implementation", "Design System Glassmorphism")));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<String>> createTask(@RequestBody String taskTitle) {
        return ResponseEntity.ok(ApiResponse.success("Task created successfully", taskTitle));
    }
}
