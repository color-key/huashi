package com.huashi.controller;

import com.huashi.dto.LogisticsInfoDTO;
import com.huashi.framework.core.controller.AppResult;
import com.huashi.framework.core.controller.BaseController;
import com.huashi.requestVO.LogisticsInfoRequestVO;
import com.huashi.service.LogisticsInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 物流信息
 * @author xiaoyu
 * @data 2020/6/19.
 */
@RestController
@RequestMapping(value = "logisticsInfo")
public class LogisticsInfoController extends BaseController {

    @Autowired
    private LogisticsInfoService logisticsInfoService;

    /**
     * 查询物流信息
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public AppResult findList(){

        AppResult result = new AppResult();
        result.setData(null);
        return result;
    }

    /**
     * 保存物流信息
     * @param requsetVO
     * @return
     */
    @RequestMapping(value = "/saveOrUpdate", method = RequestMethod.POST)
    public AppResult saveOrUpdate(@RequestBody LogisticsInfoRequestVO requsetVO ){
        logisticsInfoService.saveOrUpdate(requsetVO);
        return success("");
    }

    /**
     * 根据订单查询物流
     * @param orderNo
     * @return
     */
    @RequestMapping(value = "/getByOrderNo/{orderNo}", method = RequestMethod.GET)
    public AppResult getByOrderNo(@PathVariable String orderNo){
        LogisticsInfoDTO dto = logisticsInfoService.findByOrderNo(orderNo);

        AppResult result = new AppResult();
        result.setData(dto);
        return result;
    }

    /**
     * 根据用户查询物流
     * @param openId
     * @return
     */
    @RequestMapping(value = "/getByOpenId/{openId}", method = RequestMethod.GET)
    public AppResult getByOpenId(@PathVariable String openId){
        List<LogisticsInfoDTO> dtoList = logisticsInfoService.findByOpenId(openId);

        AppResult result = new AppResult();
        result.setData(dtoList);
        return result;
    }

    @RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
    public AppResult getById(@PathVariable Long id){
        LogisticsInfoDTO dto = logisticsInfoService.findOne(id);

        AppResult result = new AppResult();
        result.setData(dto);
        return result;
    }

    /**
     * 用户删除地址
     * @param id
     * @return
     */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public AppResult delete(@PathVariable Long id){
        logisticsInfoService.del(id);
        return success("");
    }


}
