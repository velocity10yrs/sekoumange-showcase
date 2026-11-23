package com.kaisha.SekouManagement.controller;

import com.kaisha.SekouManagement.pojo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@RestController
public class UploadController {

    @PostMapping("/upload")
    public Result upload(String username, Integer age, MultipartFile image) throws IOException {
        log.info("文件上传:{},{},{}",username,age,image);
        //获取 原始文件名
        String originalFilename = image.getOriginalFilename();
        //增加 UUID(为了避开文件名重复导致覆盖)
        String newFilename = UUID.randomUUID().toString()+originalFilename.substring(originalFilename.lastIndexOf("."));
        //储存 文件在server/local磁盘中
        image.transferTo(new File("/Users/Sapphire_20s/Desktop/SekouManage_uploadLocalStorage/"+newFilename));

        return Result.success();
    }
}
