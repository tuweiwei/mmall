package com.mall.service.impl;

import com.mall.common.Const;
import com.mall.common.ServerResponse;
import com.mall.common.TokenCache;
import com.mall.dao.UserMapper;
import com.mall.pojo.User;
import com.mall.service.IUserService;
import com.mall.util.MD5Util;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Created by Administrator on 2017/7/19.
 */
@Service("iUserService")
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public ServerResponse<User> login(String username, String password) {
        int res = userMapper.checkUser(username);
        if(res == 0){

            return ServerResponse.createByErrorMessage("用户名不存在");
        }
        String md5Password = MD5Util.MD5EncodeUtf8(password);
        User user = userMapper.selectLogin(username,md5Password);

        if(null == user){

            return ServerResponse.createByErrorMessage("密码错误");
        }

        user.setPassword(org.apache.commons.lang3.StringUtils.EMPTY);

        return ServerResponse.createBySuccess("登陆成功",user);
    }

    @Override
    public ServerResponse<String> register(User user) {
        int resCount = userMapper.checkUser(user.getUsername());
        if(resCount > 0){

            return ServerResponse.createByErrorMessage("用户名已存在");
        }
        resCount = userMapper.checkEmail(user.getEmail());
        if(resCount > 0){

            return ServerResponse.createByErrorMessage("邮箱已存在");
        }
        user.setRole(Const.Role.ROLE_CUSTOMER);
        user.setPassword(MD5Util.MD5EncodeUtf8(user.getPassword()));
        int resCounts = userMapper.insert(user);
        if(resCounts>0){
            return ServerResponse.createBySuccessMessage("注册成功");
        }
        return ServerResponse.createByErrorMessage("注册失败");


    }

    @Override
    public ServerResponse<String> checkValid(String str, String type) {

        if(StringUtils.isNoneBlank(type)){
            if(Const.USERNAME.equals(type)){
                int resCount = userMapper.checkUser(str);
                if(resCount > 0){

                    return ServerResponse.createByErrorMessage("用户名已存在");
                }

            }
            if(Const.EMAIL.equals(type)){
                int resCount = userMapper.checkUser(str);
                if(resCount > 0){

                    return ServerResponse.createByErrorMessage("邮箱已存在");
                }

            }

        }else {

            return ServerResponse.createByErrorMessage("参数错误");

        }
         return ServerResponse.createBySuccessMessage("校验成功");
    }

    @Override
    public ServerResponse<String> selectQuestion(String username) {
       int resCount = userMapper.checkUser(username);
       if(resCount < 0){
           return  ServerResponse.createByErrorMessage("用户名不存在");
       }
       String question = userMapper.selectQuestionByUsername(username);
       if (StringUtils.isNoneBlank(question))
         return  ServerResponse.createBySuccess("成功",question);
       return ServerResponse.createBySuccessMessage("问题为设置");
    }

    @Override
    public ServerResponse<String> checkAnswer(String username, String question, String answer) {

        int resCount = userMapper.checkAnswer(username,question,answer);

        if(resCount <= 0){
            return ServerResponse.createByErrorMessage("答案错误");
        }
        String token = UUID.randomUUID().toString();
        TokenCache.setKey(TokenCache.TOKEN_PREFIX+username,token);
        return  ServerResponse.createBySuccess();
    }

    @Override
    public ServerResponse<String> forgetResetPassword(String username, String passwordNew, String forgetToken) {
        if(StringUtils.isBlank(forgetToken)){
            return  ServerResponse.createByErrorMessage("TOKEN错误");
        }
        ServerResponse serverResponse = this.checkValid(username,Const.USERNAME);
        if(serverResponse.isSuccess()){
             String token = TokenCache.getKey(TokenCache.TOKEN_PREFIX+username);
             if(StringUtils.isBlank(token)){
                 return  ServerResponse.createByErrorMessage("TOKEN过期，请重试");
             }
             if(StringUtils.equals(forgetToken,token)){
                   String md5Pass = MD5Util.MD5EncodeUtf8(passwordNew);
                   int rowCount = userMapper.updatePasswordByUsername(username,md5Pass);
                   if(rowCount>1){

                       ServerResponse.createBySuccessMessage("密码更新成功");
                   }
             }else {
                 return ServerResponse.createByErrorMessage("token不一致");

             }

        }
        return ServerResponse.createBySuccessMessage("用户名不存在");

    }

    @Override
    public ServerResponse<String> resetPassword(String passwordOld, String passwordNew, User user) {
        return null;

    }

    /**
     * 校验是否是管理员
     * @param user
     * @return
     */
    public ServerResponse checkAdminRole(User user){
        if(user != null && user.getRole().intValue() == Const.Role.ROLE_ADMIN){
            return ServerResponse.createBySuccess();
        }
        return ServerResponse.createByError();
    }

}
