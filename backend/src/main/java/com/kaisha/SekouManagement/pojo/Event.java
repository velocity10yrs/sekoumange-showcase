package com.kaisha.SekouManagement.pojo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Event {
    private String eventType;
    private String eventId;
    private String eventMaker;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
