package com.kaisha.SekouManagement.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Page {
   //private int page;
   //private int range;
   private long sum;
   private List<?> list;
}
