package com.huashi.controller;

import com.huashi.dto.ShoppingCartDTO;
import com.huashi.framework.core.controller.AppResult;
import com.huashi.framework.core.controller.PaginatorController;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.requestVO.ShoppingCartRequestVO;
import com.huashi.requestVO.searchRequestVO.ShoppingCartSearchRequestVO;
import com.huashi.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 购物车
 * @author xiaoyu
 * @data 2020/6/19.
 */
@RestController
@RequestMapping(value = "shoppingCart")
public class ShoppingCartController extends PaginatorController<ShoppingCartDTO> {

    @Autowired
    private ShoppingCartService shoppingCartService;

    /**
     * 查询用户购物车
     * @param request
     * @return
     */
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    public PaginatorResult<ShoppingCartDTO> findPage(final HttpServletRequest request){
        // 分页信息
        PaginatorRequest pr = buildPaginatorRequest(request);
        ShoppingCartSearchRequestVO requestVO = new ShoppingCartSearchRequestVO();
        buildRequestVO(requestVO, request);

        PaginatorResult<ShoppingCartDTO> result = shoppingCartService.findShoppingCart(requestVO, pr);
        return result;
    }

    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    public AppResult get(@PathVariable Long id){
        ShoppingCartDTO dto = shoppingCartService.findOne(id);

        AppResult result = new AppResult();
        result.setData(dto);
        return result;
    }

    /**
     * 保存用户购物车
     * @param requsetVO
     * @return
     */
    @RequestMapping(value = "/saveOrUpdate", method = RequestMethod.POST)
    public AppResult saveOrUpdate(@RequestBody ShoppingCartRequestVO requsetVO ){
        shoppingCartService.saveOrUpdate(requsetVO);
        return success("");
    }

    /**
     * 用户删除购物车
     * @param id
     * @return
     */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public AppResult delete(@PathVariable Long id){
        shoppingCartService.del(id);
        return success("");
    }


}
