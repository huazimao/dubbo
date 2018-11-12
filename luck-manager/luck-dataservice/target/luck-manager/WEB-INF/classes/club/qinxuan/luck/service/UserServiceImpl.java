package club.qinxuan.luck.service;

import club.qinxuan.luck.mapper.UserMapper;
import club.qinxuan.luck.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Paceage:club.qinxuan.luck.service
 * Description:
 * Date:2018/11/12
 * Author: KingMao
 **/
@Service("userServiceImpl")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public List<User> getAllUser() {
        return userMapper.getAllUser();
    }
}
