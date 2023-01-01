package com.sy.bnb.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.sy.bnb.model.LodgingVo;
import com.sy.bnb.service.MainService;

@Controller
public class MainController {

	@Autowired
	MainService mainService;
	
	@RequestMapping("/")
	public String home() {
		return "main";
	}
	
	@ResponseBody
	@PostMapping("/id")
	public Boolean chkId(HttpServletRequest req) {
		String inputId = req.getParameter("inputId");
		return mainService.chkId(inputId);
	}
	
	@ResponseBody
	@GetMapping("/theme")
	public List<Map<String, String>> getTheme() {
		return mainService.getTheme();
	}
	
	@ResponseBody
	@GetMapping("/lodging")
	public List<LodgingVo> getAllLodging(HttpServletRequest req) {
		return mainService.getAllLodging();
	}
	
	@ResponseBody
	@GetMapping("lodging/pic_url")
	public void inputPicture(HttpServletRequest req, HttpServletResponse res) {
		String url = req.getParameter("url");
		ServletOutputStream bout = null;
		FileInputStream f = null;
		try {
			bout = res.getOutputStream();
			f = new FileInputStream(url);
			int length= 0;
			byte[] buffer = new byte[10];
			while((length=f.read(buffer)) != -1) {
				bout.write(buffer, 0, length);
			}
		}catch (IOException e) {
				e.printStackTrace();
		}finally {
			try {
				bout.close();
				f.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
