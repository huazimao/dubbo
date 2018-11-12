package club.qinxuan.luck.web;

import club.qinxuan.luck.model.User;
import club.qinxuan.luck.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Paceage:club.qinxuan.luck.web
 * Description:
 * Date:2018/11/12
 * Author: KingMao
 **/
@Controller
public class XMallController {
    private Logger logger = Logger.getLogger(XMallController.class);
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/user/getAllUser.do")
    public String getAllUser(HttpServletRequest request){
        logger.info("进入到xmall方法");
        List<User> userList = userService.getAllUser();
        request.setAttribute("userList", userList);
        return "index";
    }

}
