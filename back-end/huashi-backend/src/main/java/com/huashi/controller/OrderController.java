package com.huashi.controller;

import com.huashi.dto.OrderDTO;
import com.huashi.framework.core.controller.AppResult;
import com.huashi.framework.core.controller.PaginatorController;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.requestVO.OrderRequestVO;
import com.huashi.requestVO.searchRequestVO.OrderSearchRequestVO;
import com.huashi.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@RestController
@RequestMapping(value = "order")
public class OrderController extends PaginatorController<OrderDTO> {

    @Autowired
    private OrderService orderService;

    /**
     * 查询用户购物车
     * @param request
     * @return
     */
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    public PaginatorResult<OrderDTO> findPage(final HttpServletRequest request){
        // 分页信息
        PaginatorRequest pr = buildPaginatorRequest(request);
        OrderSearchRequestVO requestVO = new OrderSearchRequestVO();
        buildRequestVO(requestVO, request);

        PaginatorResult<OrderDTO> result = orderService.findOrder(requestVO, pr);
        return result;
    }

    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    public AppResult get(@PathVariable Long id){
        OrderDTO dto = orderService.findOne(id);

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
    public AppResult saveOrUpdate(@RequestBody OrderRequestVO requsetVO ){
        orderService.saveOrUpdate(requsetVO);
        return success("");
    }
}
