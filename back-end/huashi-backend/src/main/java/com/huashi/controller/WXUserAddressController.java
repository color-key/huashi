package com.huashi.controller;

import com.huashi.dto.WXUserAddressDTO;
import com.huashi.framework.core.controller.AppResult;
import com.huashi.framework.core.controller.PaginatorController;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.requestVO.WXUserAddressRequestVO;
import com.huashi.requestVO.searchRequestVO.WXUserAddressSearchRequestVO;
import com.huashi.service.WXUserAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 用户地址
 * @author xiaoyu
 * @data 2020/6/19.
 */
@RestController
@RequestMapping(value = "wxUserAddress")
public class WXUserAddressController extends PaginatorController<WXUserAddressDTO> {

    @Autowired
    private WXUserAddressService wxUserAddressService;

    /**
     * 查询用户地址列表
     * @param request
     * @return
     */
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    public PaginatorResult<WXUserAddressDTO> findPage(final HttpServletRequest request){
        // 分页信息
        PaginatorRequest pr = buildPaginatorRequest(request);
        WXUserAddressSearchRequestVO requestVO = new WXUserAddressSearchRequestVO();
        buildRequestVO(requestVO, request);

        PaginatorResult<WXUserAddressDTO> result = wxUserAddressService.findWXUserAddress(requestVO, pr);
        return result;
    }

    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    public AppResult get(@PathVariable Long id){
        WXUserAddressDTO dto = wxUserAddressService.findOne(id);

        AppResult result = new AppResult();
        result.setData(dto);
        return result;
    }

    /**
     * 保存用户地址
     * @param requsetVO
     * @return
     */
    @RequestMapping(value = "/saveOrUpdate", method = RequestMethod.POST)
    public AppResult saveOrUpdate(@RequestBody WXUserAddressRequestVO requsetVO ){
        wxUserAddressService.saveOrUpdate(requsetVO);
        return success("");
    }

    /**
     * 用户删除地址
     * @param id
     * @return
     */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public AppResult delete(@PathVariable Long id){
        wxUserAddressService.del(id);
        return success("");
    }

}
