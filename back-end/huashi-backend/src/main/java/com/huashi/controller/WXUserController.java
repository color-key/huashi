package com.huashi.controller;

import com.huashi.dto.WXUserDTO;
import com.huashi.entity.WXUser;
import com.huashi.framework.core.controller.AppResult;
import com.huashi.framework.core.controller.PaginatorController;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.requestVO.WXUserRequestVO;
import com.huashi.requestVO.searchRequestVO.WXUserSearchRequestVO;
import com.huashi.service.WXUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @author xiaoyu
 * @data 2020/6/19.
 */
@RestController
@RequestMapping(value = "wxUser")
public class WXUserController extends PaginatorController<WXUser> {

    @Autowired
    private WXUserService wxUserService;

    /**
     * 查询用户列表
     * @param request
     * @return
     */
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    public PaginatorResult<WXUserDTO> findPage(final HttpServletRequest request){
        // 分页信息
        PaginatorRequest pr = buildPaginatorRequest(request);
        WXUserSearchRequestVO requestVO = new WXUserSearchRequestVO();
        buildRequestVO(requestVO, request);

        PaginatorResult<WXUserDTO> result = wxUserService.findWXUser(requestVO, pr);
        return result;
    }

    /**
     * 保存用户
     * @param requsetVO
     * @return
     */
    @RequestMapping(value = "/saveOrUpdate", method = RequestMethod.POST)
    public AppResult saveOrUpdate(@RequestBody WXUserRequestVO requsetVO ){
        WXUser user = wxUserService.saveOrUpdate(requsetVO);
        AppResult result = new AppResult();
        result.setData(user.getId());
        return result;
    }

//    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
//    public AppResult get(@PathVariable Long id){
//        WXUserDTO dto = wxUserService.findOne(id);
//
//        AppResult result = new AppResult();
//        result.setData(dto);
//        return result;
//    }

}
